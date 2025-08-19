<script setup>
</script>

<template>
  <div class="w-[350px] h-[700px] bg-white p-4 space-y-4 overflow-y-auto">
    <div class="w-full h-max border border-neutral-200">
      <input
        class="w-full h-max p-4 outline-none"
        placeholder="Wallet Name"
      >
      <div class="w-full px-4">
        <div class="w-full h-[1px] bg-neutral-200" />
      </div>
      <textarea
        class="w-full h-[170px] p-4 outline-none resize-none"
        placeholder="Private Key"
      />
      <div class="px-4 pb-4">
        <div class="w-full p-3 bg-purple-500 flex justify-center text-white font-medium select-none cursor-pointer hover:bg-purple-600">
          Add Wallet
        </div>
      </div>
    </div>
    <template
      v-for="i in 10"
      :key="i"
    >
      <div
        class="w-full h-max hover:bg-neutral-50 border border-neutral-200 p-4 select-none cursor-pointer"
        :class="{
          '!bg-purple-100 hover:!bg-purple-100 !border-purple-300': i === 2
        }"
      >
        <div class="w-full line-clamp-1 break-all">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ratione assumenda reiciendis blanditiis atque ullam placeat iure dolorem, quam perferendis amet iusto praesentium quas numquam nam quis natus voluptates quo.
        </div>
        <div class="text-sm text-neutral-500">
          u8Ja...O12b
        </div>
      </div>
    </template>
  </div>
</template>

