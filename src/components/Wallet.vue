<script setup>
import { Keypair } from '@solana/web3.js';
import { activeWallet, formWallet, wallets } from '../storage';

import bs58 from 'bs58'

function shortWallet(wallet) {
  if (wallet.length <= 8) return wallet
  return wallet.slice(0, 4) + '...' + wallet.slice(-4)
}

function isActive(wallet) {
  return activeWallet.value?.walletStr === wallet.walletStr
}

function handleAddWallet() {
  try {
    const secretKey = bs58.decode(formWallet.privateKey)
    const keypair = Keypair.fromSecretKey(secretKey)
    const walletStr = keypair.publicKey.toBase58()
  
    wallets.value.unshift({
      name: formWallet.name,
      privateKey: formWallet.privateKey,
      walletStr
    })
  
    formWallet.name = ''
    formWallet.privateKey = ''
  } catch {
    alert('There was a problem adding the wallet, please check your private key.')
  }
}

function handleSelectWallet(wallet) {
  if (activeWallet.value && activeWallet.value.walletStr === wallet.walletStr) {
    activeWallet.value = null
  } else {
    activeWallet.value = wallet
  }
}

function handleClear() {
  formWallet.name = ''
  formWallet.privateKey = ''
}
</script>

<template>
  <div class="w-[350px] h-[700px] bg-white p-4 space-y-4 overflow-y-auto">
    <div class="w-full h-max border border-neutral-200">
      <div class="relative w-full h-max flex items-center">
        <input
          v-model="formWallet.name"
          class="w-full h-max p-4 outline-none"
          placeholder="Wallet Name"
        >
        <div
          class="absolute right-4 w-[30px] h-[30px] bg-white flex justify-center items-center select-none cursor-pointer text-purple-500 hover:underline"
          @click="handleClear"
        >
          Cl.
        </div>
      </div>
      <div class="w-full px-4">
        <div class="w-full h-[1px] bg-neutral-200" />
      </div>
      <textarea
        v-model="formWallet.privateKey"
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
          '!bg-purple-100 hover:!bg-purple-100 !border-purple-300': isActive(wallet)
        }"
        @click="handleSelectWallet(wallet)"
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

