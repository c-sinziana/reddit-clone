<template>
  <nav>
    <div class="nav-wrapper orange darken-4">
      <form @submit.prevent="updateSubreddit">
        <div class="input-field">
          <a href="#" class="brand-logo">Reddit clone</a>
          <input
            v-model="searchTerm"
            ref="subreddit"
            id="subreddit"
            class="autocomplete"
            type="search"
            required
          />
          <label class="label-icon" for="search"
            ><i class="material-icons"></i
          ></label>
          <i class="material-icons">X</i>
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
import { ref, watch, onMounted } from "vue";
export default {
  setup() {
    const searchTerm = ref("");
    const subreddit = ref(null);

    let instance;
    let debounceTimeout;

    onMounted(() => {
      console.log("hello, I am mounted");
      console.log(subreddit.value);
      instance = M.Autocomplete.init(subreddit.value, {
        data: {},
        onAutocomplete(result) {
          console.log(result);
          updateState.subreddit.value = `r/${result}`;
        },
      });
      instance.onAutocomplete = (result) => {
        console.log(result);
      };
      console.log(instance);

      async function getResults() {
        if (searchTerm.value.length < 3) return;
        const response = await API.getPosts("search", {
          q: searchTerm.value,
          type: "sr",
        });
        console.log("My response is" + response);
        const results = response.data.children.reduce((all, child) => {
          if (!child.data.over18) {
            all[child.data.display_name] = null;
          }
          return all;
        }, {});
        console.log("Results are" + results);

        instance.updateData(results);
        instance.open();
      }

      watch(
        () => searchTerm.value,
        () => {
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            getResults();
          }, 500);
        }
      );
    });

    return { subreddit, searchTerm };
  },
};
</script>
