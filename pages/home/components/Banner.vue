<script setup lang="ts"></script>

<template>
  <div>
    <div class="relative mx-auto flex justify-between max-xl:flex-col">
      <div
        class="z-50 my-[4.4375rem] ml-[5.6375rem] max-lg:mb-0 max-lg:ml-0 max-lg:mt-[3.6875rem] max-lg:text-center lg:flex lg:h-[20.625rem] lg:flex-col lg:justify-center"
      >
        <div
          class="w-[25rem] text-5xl font-semibold leading-[4.1875rem] max-lg:w-full max-lg:text-3xl"
        >
          {{ $t('home.banner_title') }}
        </div>
        <I18nT
          keypath="home.banner_info_txt"
          tag="div"
          scope="global"
          class="text-28 mt-2 w-[22.5rem] text-[#17181a] max-lg:mx-auto max-lg:w-6/12"
        >
          <template #tradingQuantity>
            <span class="text-primary">{{ $t('home.banner_color_txt') }}</span>
          </template>
        </I18nT>
      </div>
    </div>
  </div>
</template>
