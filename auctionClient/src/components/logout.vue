<template>
  <div class="container">
    <h4> You will logout from Auction me.</h4>
    <a href="/" v-on:click="logoutUser()"> Log out</a>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        error: "",
        errorFlag: false,

      }
    },
    mounted: function () {
    },
    methods: {

      logoutUser: function () {

        this.$cookie.delete("user_id");
        this.$cookie.delete("session");
        console.log(this.$cookie.get("user_id"));
        this.$route.push('/auctions');

      },

    }
  }
</script>
