<template>
  <div class="max-w-full overflow-auto pr-4">
    <input
      v-if="search"
      type="text"
      class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
      v-model="keywords"
      placeholder="Masukan keyword..."
      @keyup.enter="debounceEmitSearch"
    />
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
            :class="item.class"
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
          v-for="(item, int) in modifiedList"
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
            v-for="(items,i) in format.edit"
            :key="i"
            contenteditable="true"
            @blur="updateValue($event,items.action, item[items.key], items.model)"
          >
            {{ item[items.model] }}
          </td>
          <td
            v-for="(items,i) in format.hit"
            :key="i"
            @click="updateValue($event,items.action, item[items.key], items.model)"
          >
            {{ item[items.model] }}
          </td>
          <td
            v-for="(items, i) in format.currency"
            :key="i"
          >
            {{ formatNumber(item[items])}}
          </td>
          <td
            v-for="(items, i) in format.time"
            :key="i"
          >
            {{ formatDate(item[items.model],item[items.format])}}
          </td>
          <td
            v-for="(items, i) in format.image"
            :key="i"
          >
            <img
              :src="item[items]"
              :class="imageClass"
              max-width="100px"
            />
          </td>
          <td
            v-for="(items, i) in format.vhtml"
            :key="i"
            v-html="item[items]"
          ></td>
          <td
            v-for="items,i in format.select"
            :key="i"
          >
            <select
              @change="updateValueSelect($event,items.action, item[items.key], items.model)"
              :class="items.class ?? ''"
            >
              <option>{{item[items.model]}}</option>
              <option
                v-for="li in items.list"
                :key="li[items.value]"
                :value="li[items.value]"
              >{{li[items.display]}}
              </option>
            </select>
          </td>
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
    <div v-if="paging">
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
import moment from "moment";
import helper from "../controller/helper";
export default {
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
    paging: { type: Boolean, default: false },
    classing: { type: String, default: "" },
    imageClass: { type: String, default: "" },
    search: { type: Boolean, default: false },
    keyword: { type: Array, default: [] },
    searchSsr: { type: Boolean, default: false },
    searchAction: { type: String, default: "" },
  },
  methods: {
    formatNumber(num) {
      return helper.formatNumber(num);
    },
    updateValue(event, action, index, model) {
      const newValue = event.target.innerText;
      this.$emit(action, { key: index, model, value: newValue });
    },
    updateValueSelect(event, action, index, model) {
      const newValue = event.target.value;
      this.$emit(action, { key: index, model, value: newValue });
    },
    formatDate(value, format = "YYYY-MM-DD") {
      return value ? moment(value).format(format) : "-";
    },
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
    debounceEmitSearch() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.$emit(this.searchAction, this.keywords);
      }, 300);
      this.keywords = "";
    },
  },
  data() {
    return {
      keywords: "",
      debounceTimeout: null,
    };
  },
  computed: {
    modifiedList() {
      let result = [];

      if (this.keywords === "") {
        return [...this.list];
      }

      if (this.searchSsr) {
        return;
      }

      if (this.keyword.length > 0 && this.list.length > 0) {
        result = this.list.filter((item) => {
          return this.keyword.some((key) => {
            // Check if the key exists in the item and its value includes the keyword
            return (
              item[key] && // Ensure the key exists in the item
              item[key]
                .toString()
                .toLowerCase()
                .includes(this.keywords.toString().toLowerCase())
            );
          });
        });
      }

      return result ?? [];
    },
  },
  async created() {
    for (let i of this.format.header) {
      i.cursor = true;
    }
  },
};
</script>
