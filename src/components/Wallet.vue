<script setup>
import { reactive } from 'vue';
import { Keypair } from '@solana/web3.js';
import { useStorage } from "@vueuse/core";

import bs58 from 'bs58'

const activeWallet = useStorage('active-wallet', null)
const wallets = useStorage('wallets', [])

const form = reactive({
  name: '',
  privateKey: ''
})

function shortWallet(wallet) {
  if (wallet.length <= 8) return wallet
  return wallet.slice(0, 4) + '...' + wallet.slice(-4)
}

function handleAddWallet() {
  try {
    const secretKey = bs58.decode(form.privateKey)
    const keypair = Keypair.fromSecretKey(secretKey)
    const walletStr = keypair.publicKey.toBase58()
  
    wallets.value.unshift({
      name: form.name,
      privateKey: form.privateKey,
      walletStr
    })
  
    form.name = ''
    form.privateKey = ''
  } catch {
    alert('Ada masalah saat menambahkan wallet, silahkan cek private key anda.')
  }
}
</script>

<template>
  <div class="w-[350px] h-[700px] bg-white p-4 space-y-4 overflow-y-auto">
    <div class="w-full h-max border border-neutral-200">
      <input
        v-model="form.name"
        class="w-full h-max p-4 outline-none"
        placeholder="Wallet Name"
      >
      <div class="w-full px-4">
        <div class="w-full h-[1px] bg-neutral-200" />
      </div>
      <textarea
        v-model="form.privateKey"
        class="w-full h-[170px] p-4 outline-none resize-none"
        placeholder="Private Key"
      />
      <div class="px-4 pb-4">
        <div
          class="w-full p-3 bg-purple-500 flex justify-center text-white font-medium select-none cursor-pointer hover:bg-purple-600"
          @click="handleAddWallet"
        >
          Add Wallet
        </div>
      </div>
    </div>
    <template
      v-for="wallet in wallets"
      :key="wallet.walletStr"
    >
      <div
        class="w-full h-max hover:bg-neutral-50 border border-neutral-200 p-4 select-none cursor-pointer"
        :class="{
          '!bg-purple-100 hover:!bg-purple-100 !border-purple-300': i === 2
        }"
      >
        <div class="w-full line-clamp-1 break-all">
          {{ wallet.name }}
        </div>
        <div class="text-sm text-neutral-500">
          {{ shortWallet(wallet.walletStr) }}
        </div>
      </div>
    </template>
  </div>
</template>

