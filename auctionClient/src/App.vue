<template>

  <div id="app" >
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <div id="logo">
      <img class='img-rounded' src="./assets/Logo.png" height="150" >
    </div>

    <div class="nav-container container-fluid">
      <ul class="nav  row bg-dark">
        <li class="nav-item col">
          <img src="./assets/Logo2.png" height="50" align="right">
        </li>
        <li class="nav-item col">
          <a class="text-white" href="/" style="text-decoration:none" >Home</a>
        </li>

        <li class="nav-item col" >
          <a class=" text-white" href="/auctions" style="text-decoration:none">All Auctions</a>
        </li>


        <li class=" nav-item col" >
          <div class="dropdown">
            <a class="dropdown-toggle text-white" data-toggle="dropdown" >My Auctions</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Buying</a> </li>
              <li><a class="dropdown-item" href="/#">Selling</a> </li>
              <li class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="/myaccount">View my details</a> </li>
            </ul>
          </div>

        </li>

        <li class=" nav-item col">
          <a class="text-white" href="/sell" style="text-decoration:none">Sells</a>
        </li>
        <li class=" nav-item col">
          <div class="dropdown">
            <a class="dropdown-toggle text-white" data-toggle="dropdown" >My Account</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/users/register">Register</a> </li>
              <li><a class="dropdown-item" href="/users/login">Login</a> </li>
              <li><a class="dropdown-item" href="/users/logout">Logout</a> </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  ul {

    padding:5px;
    margin:2px;
  }
  li {
    padding:5px;
    list-style-type: none;
    margin:auto;
    text-align:center;
    display:block;

  }



</style>
