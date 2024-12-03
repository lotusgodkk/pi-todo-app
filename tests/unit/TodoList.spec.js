import { shallowMount } from "@vue/test-utils";
import TodoList from "@/components/TodoList/TodoList.vue";

import store from "@/store";

const mockT = (key) => key;
// Mock Vuex store

describe("TodoApp.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoList, {
      global: {
        plugins: [store],
        mocks: {
          $t: mockT,
        },
      },
    });
  });

  it("renders TodoList components", () => {
    expect(wrapper.findComponent(TodoList).exists()).toBe(true);
  });

  it("finds a specific element and checks if it exists", () => {
    const textarea = wrapper.find("textarea#composer");
    expect(textarea.exists()).toBe(true);
  });
});
