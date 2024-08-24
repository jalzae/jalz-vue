<template>
  <div>
    <div
      v-if="status"
      class="w-full overflow-x-hidden overflow-y-auto max-h-screen fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-full my-10 mx-4 max-w-5xl overflow-y-auto max-h-screen">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              {{ selected.title ?? "Not Found" }}
            </h3>
            <button
              class="text-red-500"
              @click="close"
            >X</button>
          </div>

          <div class="w-full h-full md:flex md:flex-row justify-center items-start p-8">
            <component :is="selected.component" />
          </div>

          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <component :is="selected.footer" />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="status"
      class="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>
  </div>
</template>

<script>
import NotFound from "./NotFound.vue";
export default {
  props: {
    status: { type: Boolean, default: false },
    selected: {
      type: Object,
      default: {
        title: "Not Found",
        component: NotFound,
        footer: null,
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>