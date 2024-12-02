import { shallowMount } from "@vue/test-utils";
import TodoItem from "@/components/TodoList/TodoItem.vue";

import store from "@/store";

const mockT = (key) => key;
// Mock Vuex store

describe("TodoItem.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoItem, {
      props: {
        todo: {
          text: "Test Todo",
          priority: "critical",
          username: "kamlesh",
        },
      },
      global: {
        plugins: [store],
        mocks: {
          $t: mockT,
        },
      },
    });
  });

  it("renders TodoItem components", () => {
    expect(wrapper.findComponent(TodoItem).exists()).toBe(true);
  });

  it("finds button element and checks if it exists", () => {
    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    console.log(button.html());
  });
});
