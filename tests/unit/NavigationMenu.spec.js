import { shallowMount } from "@vue/test-utils";
import NavigationMenu from "@/components/Navigation/NavigationMenu.vue";
import store from "@/store";

const mockT = (key) => key;
// Mock Vuex store

describe("TodoApp.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NavigationMenu, {
      global: {
        plugins: [store],
        mocks: {
          $t: mockT,
        },
      },
    });
  });

  it("renders NavigationMenu components", () => {
    expect(wrapper.findComponent(NavigationMenu).exists()).toBe(true);
  });

  it("finds logo anchor element and checks if it exists", () => {
    const anchor = wrapper.find("a img");
    expect(anchor.exists()).toBe(true);
    console.log(anchor.html());
  });

  it("finds logout button and checks if it exists", () => {
    const logout = wrapper.find("button.danger");
    expect(logout.exists()).toBe(true);
    console.log(logout.html());
  });
});
