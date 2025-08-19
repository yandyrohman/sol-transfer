<script setup>
</script>

<template>
  <div class="w-[350px] h-[700px] bg-white p-4 space-y-4">
    <div class="w-full space-y-2">
      <div class="w-full line-clamp-1 break-all">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, voluptas aspernatur. Quae illum incidunt nostrum, dolores odit cum sed rem mollitia ab eius, aspernatur debitis neque dolorum necessitatibus vero ut.
      </div>
      <div class="shrink-0 w-max flex gap-4">
        <div class="text-purple-500 select-none cursor-pointer hover:underline">
          Change
        </div>
        <div class="text-purple-500 select-none cursor-pointer hover:underline">
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
      <div class="break-all text-purple-500 hover:underline select-none cursor-pointer">
        https://solscan.io/tx/5jNUxmi1jrm8SKuQ395Qk4XmiM3mUwojpknBNCEiQ6hYnTyC5XjNrDowJT9RbUzuqpnsxgi8VXTCwprvC3RM3GwR
      </div>
    </div>
  </div>
</template>

