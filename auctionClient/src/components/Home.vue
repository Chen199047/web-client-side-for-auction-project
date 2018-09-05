<template>
  <div>
   <div id="_search">
     <br/>
     <form class="form-inline row">
       <div class="col-3"></div>
       <input v-model="search" name = "search" id="search" class="form-control col-4" type="text" placeholder="Search">

       <button class="btn btn-dark col-1" type="button" v-on:click="searchString()">Search</button>
     </form>
   </div>
    <br>
    <div class="row">
      <div class="col-1">
      </div>
      <div id="viewall" class="col-2">
        <a href="/auctions">view all auctions >></a>
      </div>

    </div>

    <br>

   <div class="tab-content container">
    <div v-if="errorFlag" style="color: red;">
      {{error}}
    </div>
     <div id="auctions" class="container tab-pane active" >
       <div class="row">

        <section class="auction-all-items" v-for="auction in auctions">
          <div class="col-md-12">
            <div class="img-thumbnail" style="width: 250px; height: 300px" >
              <img v-bind:src= "imageUri[auction.id]" alt="Lights" style="width: 100%; height: 220px">
              <div class="figure-caption">
                <p>{{auction.title}}</p>
              </div>
              <div class="panel-footer button">
                <router-link :to="{ name: 'auction', params: {auctionId: auction.id }}"
                             v-on:click="this.getSingleAuction($route.params.auctionId)">View the detail</router-link>
              </div>
              <br/>
            </div>
            <br/>
          </div>
        </section>
       </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data(){
      return{
        err:'',
        errorFlag: false,
        imageUri:[],
        auctions:[],
        search:"",
        authToken:"",



      }

    },
  created: function () {
      //this.getPhoto();
      this.getCountAuctions();

  },
    methods:{
      searchString: function () {
        if(this.search){
          console.log(this.search)
          this.$http.get('http://localhost:4941/api/v1/auctions?q='+this.search
          ).then(function (response) {
            //console.log(response.data);
            this.auctions = response.data;

            //this.getPhoto();

          },function (error) {
            this.error = error;
            this.errorFlag = true;

          })
        }else{
          alert("Please fill up all the requirement");
        }


      },
      getCountAuctions:function () {
        this.$http.get('http://localhost:4941/api/v1/auctions?count=6',

        ).then(function (response) {
          this.auctions = response.data;
          console.log(response.data);
          this.getPhoto();


        },function (error) {
          this.error = error;
          this.errorFlag = true;

        })

      },
      getPhoto:function () {
        for(let i =0; i<this.auctions.length; i++){
          this.imageUri[this.auctions[i].id] = 'http://localhost:4941/api/v1/auctions/' + this.auctions[i].id+"/photos";
        }


      }
    }
  }
</script>
