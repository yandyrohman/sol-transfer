<script setup>
import { activeWallet, formWallet, wallets } from '../storage';

function handleShowPrivateKey() {
  formWallet.name = activeWallet.value?.name
  formWallet.privateKey = activeWallet.value?.privateKey
}

function handleDelete() {
  if (confirm(`Hapus wallet '${activeWallet.value.name}' ?`)) {
    wallets.value = wallets.value.filter(wallet => wallet.walletStr !== activeWallet.value.walletStr)
    activeWallet.value = null
  }
}
</script>

<template>
  <div class="w-[350px] h-[700px] bg-white p-4 space-y-4">
    <template v-if="activeWallet">
      <div class="w-full space-y-2">
        <div class="w-full line-clamp-1 break-all">
          {{ activeWallet.name }}
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
      <div class="w-full space-y-2">
        <div class="font-medium text-[20px]">
          1,000,000,000,000 Lamp.
        </div>
        <div class="text-neutral-500">
          1,000 SOL
        </div>
      </div>
      <div class="w-full h-max border border-neutral-200">
        <textarea
          class="w-full h-[80px] p-4 outline-none resize-none"
          placeholder="Public Key"
        />
        <div class="w-full px-4">
          <div class="w-full h-[1px] bg-neutral-200" />
        </div>
        <input
          type="number"
          class="w-full h-max p-4 outline-none"
          placeholder="Lamp. Amount"
        >
        <div class="px-4 pb-4">
          <div class="w-full p-3 bg-purple-500 flex justify-center text-white font-medium select-none cursor-pointer hover:bg-purple-600">
            Transfer
          </div>
        </div>
      </div>
      <div class="w-full space-y-2 pt-2">
        <div class="w-full flex justify-between">
          <div class="text-neutral-500">
            Basic Fee
          </div>
          <div>5000 Lamp.</div>
        </div>
        <div class="w-full flex justify-between">
          <div class="text-neutral-500">
            Rent Fee
          </div>
          <div>5000 Lamp.</div>
        </div>
        <div class="w-full flex justify-between">
          <div class="text-neutral-500">
            Entered Bal.
          </div>
          <div>1,000,000,000,000 Lamp.</div>
        </div>
      </div>
      <div class="w-full h-[1px] bg-neutral-200" />
      <div class="w-full space-y-2">
        <div>
          Signature
        </div>
        <div class="break-all text-purple-500 hover:underline cursor-pointer">
          https://solscan.io/tx/5jNUxmi1jrm8SKuQ395Qk4XmiM3mUwojpknBNCEiQ6hYnTyC5XjNrDowJT9RbUzuqpnsxgi8VXTCwprvC3RM3GwR
        </div>
      </div>
    </template>
    <template v-else>
      <div class="text-neutral-500">
        Please select wallet.
      </div>
    </template>
  </div>
</template>

