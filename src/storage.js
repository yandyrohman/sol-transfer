import { useStorage } from "@vueuse/core";
import { reactive, ref } from "vue";

const solanaInUsd = ref(0)
const wallets = useStorage('wallets', [])
const activeWallet = ref(null)
const formWallet = reactive({
  name: '',
  privateKey: ''
})

export { solanaInUsd, wallets, activeWallet, formWallet }