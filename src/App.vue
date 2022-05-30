<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
export default {
  name: "app",
  components: {},
  data() {
    return {
      data: [],
      options: {
        first: "BTC",
        second: "ETH",
      },
      result: 0,
      currency: "",
    };
  },
  mounted() {
    const getData = () => {
      fetch("https://poloniex.com/public?command=returnTicker")
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
          /* console.log(this.data, "this"); */
        });
    };

    getData();
  },
  methods: {
    convertCurrencies: function () {
      Object.entries(this.data).filter((d) => {
        if (d[0] === this.options.first + "_" + this.options.second) {
          this.result = d[1].last;
          this.currency = d[0];
        } else {
          if (
            (this.options.first === "USDC" && this.options.second === "ETH") ||
            (this.options.second === "USDC" && this.options.first === "ETH")
          ) {
            let a = Object.entries(this.data).filter((d) => d[0] === "BTC_ETH");
            let b = Object.entries(this.data).filter(
              (d) => d[0] === "USDC_BTC"
            );

            let resultCalcB = 1 / b[0][1]?.last;

            let resultCalcA = a[0][1]?.last / resultCalcB;
            if (this.options.first === "ETH") {
              this.result = 1 / resultCalcA;
              this.currency = a[0][0];
            } else {
              this.result = resultCalcA;
            }
          }
          if (this.options.first === "BTC" && this.options.second === "USDC") {
            let a = Object.entries(this.data).filter(
              (d) => d[0] === "USDC_BTC"
            );
            let resultCalc = 1 / a[0][1]?.last;

            this.result = resultCalc;
            this.currency = a[0][0].substring(5, 8);
          }
          if (this.options.first === "ETH" && this.options.second === "BTC") {
            let a = Object.entries(this.data).filter((d) => d[0] === "BTC_ETH");
            let resultCalc = 1 / a[0][1]?.last;

            this.result = resultCalc;
            this.currency = a[0][0].substring(4, 7);
          }
        }
      });
    },
    handleChangeFirst: function (e) {
      this.options.first =
        e.target.options[e.target.options.selectedIndex].text;
      this.convertCurrencies();
    },
    handleChangeSecond: function (e) {
      this.options.second =
        e.target.options[e.target.options.selectedIndex].text;
      this.convertCurrencies();
    },
  },
};
</script>

<template>
  <div id="app">
    <div class="container">
      <h1>crypto converter</h1>
    
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 100%;
}
.inputs {
  display: flex;
}
.result {
  margin-top: 30px;
}
.result h3 {
  font-weight: bold;
}
h1 {
  color: green;
  padding-bottom: 30px;
}
h4 {
  padding: 0 20px;
}
button {
  margin-bottom: 20px;
}
</style>
