<template>
  <div class="max-w-full overflow-auto pr-4">
    <table
      class="table table-striped w-full"
      :class="classing"
    >
      <thead>
        <tr class="border text-black text-center font-bold">
          <td>#</td>
          <td
            class="px-4 py-2 border border-gray-200"
            v-for="(item, index) in format.header"
            :key="item.name"
          >
            <p class="justify-between items-center text-center">
              {{ item.name }}
              <i
                v-if="item.cursor_visible"
                @click="orderBy(index)"
                class="fa-solid cursor-pointer fa-2xs text-black"
                :class="item.cursor ? 'fa-arrow-down-long' : 'fa-arrow-up-long'"
              ></i>
            </p>
          </td>
          <td
            v-if="format.action && list.length > 0"
            class="px-4 py-2"
          >{{ actionName }}</td>
        </tr>
      </thead>
      <tbody v-if="list.length == 0 || !format.body">
        <tr class="text-center border p-8 font-bold text-xl">
          <td :colspan="format.header.length + 1">No Data</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          v-for="(item, int) in list"
          :key="item[format.body[0]]"
          class="rounded-lg border text-center"
          :class="(format.class ?? '',
          int % 2
            ? 'hover:bg-gray-100 bg-white'
            : 'bg-gray-100 hover:bg-white')
          "
          @click="format.hitAction ? $emit(format.hitAction, int) : null"
        >
          <td class="px-4 py-2 text-lg">{{ int + 1 }}</td>
          <td
            v-for="(items, i) in format.body"
            :key="i"
            class="px-4 py-2 text-md"
          >
            {{ item[items] }}
          </td>
          <td
            v-for="(items, i) in format.image"
            :key="i"
          >
            <img
              :src="item[items]"
              max-width="100px"
            />
          </td>
          <td
            v-for="(items, i) in format.vhtml"
            :key="i"
            v-html="item[items]"
          ></td>
          <td
            v-for="act in format.button"
            :key="act.model"
          >
            <button
              style="margin: 10px !important"
              :class="item[act.model] == act.status ? act.class : act.classFalse
              "
              @click="
    $emit(
      item[act.model] == act.status ? act.action : act.actionFalse,
      item[act.id]
    )
    "
              class="btn"
            >
              <i :class="item[act.model] == act.status ? act.icon : act.iconFalse
                "></i>
              {{ item[act.model] == act.status ? act.text : act.textFalse }}
            </button>
          </td>
          <td v-if="format.action && format.action.length > 0">
            <button
              style="margin: 10px !important"
              v-for="act in format.action"
              :key="act.action"
              :class="act.class"
              @click="$emit(act.action, item[act.model])"
              class="btn"
            >
              <i :class="act.icon"></i> {{ act.text }}
            </button>
          </td>

          <td v-if="format.action2 && format.action2.length > 0">
            <div class="relative inline-block text-left"></div>
            <button
              style="margin: 10px !important"
              class="btn"
              @click="toggleDropdown(int)"
              :aria-expanded="isDropdownOpen === int ? true : false"
            >
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>

            <div
              v-if="isDropdownOpen === int"
              @mouseleave="closeDropdown(int)"
              class="absolute right-0 w-48 mb-4 bg-white border border-gray-200 rounded-lg shadow-md z-10"
            >
              <ul>
                <li
                  v-for="items in format.action2"
                  :key="items.action"
                  class="hover:bg-gray-100 py-2 px-4"
                  :class="items.class ?? ''"
                  @click="$emit(items.action, item[items.model])"
                >
                  <button
                    href="#"
                    class="w-full flex justify-between items-center text-center"
                  >
                    <p class="w-1/2">{{ items.text }}</p>
                    <i
                      v-if="items.icon"
                      :class="items.icon"
                      class="w-1/2"
                    ></i>
                  </button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="is_paging">
      <Paging
        :page="page"
        :per_page="per_page"
        :total_page="total_page"
        @prevpage="prevpage"
        @nextpage="nextpage"
      >
      </Paging>
    </div>
  </div>
</template>
<script>
import Paging from "./Paging.vue";
export default{
  mixins: [],
  components: { Paging },
  props: {
    format: {
      type: Object,
      required: true,
    },
    list: { type: Array, required: true },
    page: { type: Number, default: 1 },
    per_page: { type: Number, default: 1 },
    actionName: { type: String, default: "" },
    total_page: { type: Number, default: 1 },
    is_paging: { type: Boolean, default: false },
    classing: { type: String, default: "" },
  },
  methods: {
    prevpage() {
      this.$emit("prevpage");
    },
    nextpage() {
      this.$emit("nextpage");
    },
    orderBy(index) {
      this.format.header[index].cursor = !this.format.header[index].cursor;
    },
    toggleDropdown(index) {
      if (this.isDropdownOpen === index) {
        this.isDropdownOpen = null;
      } else {
        this.isDropdownOpen = index;
      }
    },
    closeDropdown(index) {
      if (this.isDropdownOpen === index) {
        this.isDropdownOpen = null;
      }
    },
  },
  async created() {
    for (let i of this.format.header) {
      i.cursor = true;
    }
  },
}
</script>
