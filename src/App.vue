<script setup>
import { onMounted } from 'vue'
import { solanaInUsd } from './storage'

import Wallet from './components/Wallet.vue'
import Main from './components/Main.vue'

async function handleFetchPrices() {
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
  try {
    const response = await fetch(url)
    const rateData = await response.json()
    solanaInUsd.value = rateData.solana.usd
  } catch (error) {
    alert(error)
  }
}

onMounted(() => {
  handleFetchPrices()
})
</script>

<template>
  <div class="w-full h-dvh bg-neutral-300 flex justify-center items-center gap-5">
    <Wallet />
    <Main />
  </div>
</template>