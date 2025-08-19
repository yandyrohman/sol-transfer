import { useStorage } from "@vueuse/core";
import { reactive, ref } from "vue";

const wallets = useStorage('wallets', [])
const activeWallet = ref(null)
const formWallet = reactive({
  name: '',
  privateKey: ''
})

export { wallets, activeWallet, formWallet }