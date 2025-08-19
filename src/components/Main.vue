<script setup>
import { ref, watch } from 'vue';
import { ComputeBudgetProgram, Connection, Keypair, PublicKey, SystemProgram, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import { activeWallet, formWallet, wallets } from '../storage';

import bs58 from 'bs58'

const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=53858f8a-8cfd-413d-9f10-04050c25dd19')
const loadingBalance = ref(false)
const loadingTransfer = ref(false)

const dataBalance = ref(0)
const dataMinimumRent = ref(0)
const dataSignature = ref(null)

const showWarningRent = ref(false)
const showWarningInvalid = ref(false)
const formWalletDestination = ref('')
const formAmount = ref(null)

function formatNumber(num) {
  const [intPart, decimalPart] = num.toString().split('.')
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (decimalPart ? '.' + decimalPart : '')
}

function handleShowPrivateKey() {
  formWallet.name = activeWallet.value?.name
  formWallet.privateKey = activeWallet.value?.privateKey
}

function handleDelete() {
  if (confirm(`Delete wallet '${activeWallet.value.name}' ?`)) {
    wallets.value = wallets.value.filter(wallet => wallet.walletStr !== activeWallet.value.walletStr)
    activeWallet.value = null
  }
}

async function handleGetBalance() {
  if (activeWallet.value) {
    try {
      loadingBalance.value = true
      const walletAddress = new PublicKey(activeWallet.value.walletStr)
      const balance = await connection.getBalance(walletAddress)
      dataBalance.value = balance
    } catch (error) {
      alert(error)
    } finally {
      loadingBalance.value = false
    }
  }
}

async function handleGetRentFee() {
  const accountSize = 0
  dataMinimumRent.value = await connection.getMinimumBalanceForRentExemption(accountSize)
}

async function handleInputWalletDestination() {
  dataSignature.value = null
  showWarningInvalid.value = false
  showWarningRent.value = false

   try {
    const walletAddress = new PublicKey(formWalletDestination.value)
    const balance = await connection.getBalance(walletAddress)
    if (balance === 0) {
      showWarningRent.value = true
    } else {
      showWarningRent.value = false
    }
  } catch {
    showWarningInvalid.value = true
  }
}

async function handleTransfer() {
  if (loadingTransfer.value) {
    return
  }

  try {
    loadingTransfer.value = true
    dataSignature.value = null

    const fromSecretKey = bs58.decode(activeWallet.value.privateKey)
    const fromKeypair = Keypair.fromSecretKey(fromSecretKey)
    const instructions = []
  
    instructions.push(ComputeBudgetProgram.setComputeUnitLimit({
      units: 200_000
    }))
  
    instructions.push(ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: 0,
    }))
  
    instructions.push(SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: new PublicKey(formWalletDestination.value),
      lamports: Number(formAmount.value)
    }))
  
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
    const msgV0 = new TransactionMessage({
      payerKey: fromKeypair.publicKey,
      recentBlockhash: blockhash,
      instructions
    }).compileToV0Message()
  
    const tx = new VersionedTransaction(msgV0)
    tx.sign([fromKeypair])
  
    const signature = await connection.sendRawTransaction(tx.serialize(), {
      skipPreflight: false,
      maxRetries: 3
    })

    dataSignature.value = signature
    await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'confirmed')

    formWalletDestination.value = ''
    formAmount.value = null
  } catch (error) {
    alert(error)
  } finally {
    loadingTransfer.value = false
  }
}

watch(() => activeWallet.value, () => {
  loadingTransfer.value = false
  dataSignature.value = null
  showWarningRent.value = false
  showWarningInvalid.value = false
  formWalletDestination.value = ''
  formAmount.value = null
  handleGetBalance()
  handleGetRentFee()
})
</script>

<template>
  <div class="w-[350px] h-[700px] bg-white p-4 space-y-4">
    <template v-if="activeWallet">
      <div class="w-full space-y-2">
        <div class="w-full line-clamp-1 break-all">
          {{ activeWallet.name }}
        </div>
        <div class="w-full text-neutral-500 break-all">
          {{ activeWallet.walletStr }}
        </div>
        <div class="shrink-0 w-max flex gap-4">
          <div
            class="text-purple-500 select-none cursor-pointer hover:underline"
            @click="handleShowPrivateKey"
          >
            Show Prv.
          </div>
          <div
            class="text-purple-500 select-none cursor-pointer hover:underline"
            @click="handleDelete"
          >
            Delete
          </div>
        </div>
      </div>
      <div class="w-full h-[1px] bg-neutral-200" />
      <template v-if="!loadingBalance">
        <div class="w-full space-y-2">
          <div class="font-medium text-[20px]">
            {{ formatNumber(dataBalance) }} Lamp.
          </div>
          <div class="text-neutral-500">
            {{ formatNumber(dataBalance / 1e9) }} SOL
          </div>
        </div>
        <div class="w-full h-max border border-neutral-200">
          <textarea
            v-model="formWalletDestination"
            class="w-full h-[80px] p-4 outline-none resize-none"
            placeholder="Public Key"
            @input="handleInputWalletDestination"
          />
          <div class="w-full px-4">
            <div class="w-full h-[1px] bg-neutral-200" />
          </div>
          <input
            v-model="formAmount"
            type="number"
            class="w-full h-max p-4 outline-none"
            placeholder="Lamport Amount"
          >
          <div class="px-4 pb-4">
            <div
              class="w-full p-3 bg-purple-500 flex justify-center text-white font-medium select-none cursor-pointer hover:bg-purple-600"
              :class="{
                'opacity-50': loadingTransfer
              }"
              @click="handleTransfer"
            >
              {{ loadingTransfer ? 'Loading..' : 'Transfer' }}
            </div>
          </div>
          <div
            v-if="showWarningRent"
            class="text-xs px-4 pb-4 text-red-600"
          >
            Destination wallet is empty, transfer minimum {{ formatNumber(dataMinimumRent) }} Lamport to avoid rent exemption.
          </div>
          <div
            v-if="showWarningInvalid"
            class="text-xs px-4 pb-4 text-red-600"
          >
            Destination wallet invalid.
          </div>
        </div>
        <div
          v-if="formAmount"
          class="w-full space-y-2 pt-2"
        >
          <div
            class="w-full flex justify-between"
          >
            <div class="text-neutral-500">
              Basic Fee
            </div>
            <div>5,000 Lamp.</div>
          </div>
          <div
            class="w-full flex justify-between"
          >
            <div class="text-neutral-500">
              Total Out
            </div>
            <div>{{ formatNumber(formAmount + 5000) }} Lamp.</div>
          </div>
        </div>
        <div
          v-if="dataSignature"
          class="w-full space-y-2"
        >
          <div>
            Signature
          </div>
          <a
            :href="`https://solscan.io/tx/${dataSignature}`"
            target="_blank"
            class="w-full line-clamp-1 break-all text-purple-500 hover:underline cursor-pointer select-none"
          >
            https://solscan.io/tx/{{ dataSignature }}
          </a>
        </div>
      </template>
      <template v-else>
        <div>Loading..</div>
      </template>
    </template>
    <template v-else>
      <div class="text-neutral-500">
        Please select wallet.
      </div>
    </template>
  </div>
</template>

