webpackJsonp([1],Array(25).concat([function(t,e,a){"use strict";var n=a(15),s=a(94),i=a(77),r=a.n(i),c=a(75),o=a.n(c);n.a.use(s.a),e.a=new s.a({routes:[{path:"/",name:"index",component:r.a},{path:"/warenkorb",name:"shoppingcart",component:o.a}]})},function(t,e,a){function n(t){a(71)}var s=a(0)(a(31),a(84),n,null,null);t.exports=s.exports},,,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(15),s=a(28),i=a(27),r=a.n(i),c=a(29),o=a(26),l=a.n(o),u=a(25);n.a.config.productionTip=!1,n.a.use(c.a),n.a.use(s.a),n.a.use(r.a),n.a.http.interceptors.push(function(t,e){t.headers.set("Content-Type","application/json"),e()});var d=new c.a.Store({state:{count:0},mutations:{increment:function(t,e){t.count+=e},initial:function(t,e){t.count=e}}});new n.a({el:"#app",router:u.a,store:d,template:"<App/>",components:{App:l.a}})},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(79),s=a.n(n),i=a(78),r=a.n(i);e.default={components:{TopBar:s.a,PageHeader:r.a},name:"app",created:function(){this.cartKeyHandling()},updated:function(){this.cartKeyHandling()},methods:{cartKeyHandling:function(){var t=this;null===this.$localStorage.get("cartKey")&&this.$http.post("/api/cart",{}).then(function(e){t.$localStorage.set("cartKey",e.body.key)},function(t){console.log("FEHLER AUFGETRETEN",t)})}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(41),s=a.n(n),i=a(76),r=a.n(i);e.default={components:{CartItem:r.a},name:"CartPage",data:function(){return{cart:{},loading:!0}},beforeCreate:function(){console.log("SICHER")},mounted:function(){this.getItems()},methods:{productDeleted:function(t){var e=this;this.$http.delete("/api/cart/item/"+this.cartKey+"/"+t.id).then(function(t){t&&e.getItems()},function(t){return!1})},getItems:function(){var t=this;this.$http.get("/api/cart/"+this.cartKey).then(function(e){t.cart=e.body,t.loading=!1,t.calculateItemCount()},function(e){e&&(t.loading=!1)})},hasItems:function(){return void 0!==this.cart.items&&this.cart.items.length>0},calculateTotalAmount:function(){var t=0,e=!0,a=!1,n=void 0;try{for(var i,r=s()(this.cart.items);!(e=(i=r.next()).done);e=!0){var c=i.value;t+=c.price*c.amount}}catch(t){a=!0,n=t}finally{try{!e&&r.return&&r.return()}finally{if(a)throw n}}return t.toFixed(2)},calculateItemCount:function(){var t=0,e=!0,a=!1,n=void 0;try{for(var i,r=s()(this.cart.items);!(e=(i=r.next()).done);e=!0){var c=i.value;t+=parseInt(c.amount,10)}}catch(t){a=!0,n=t}finally{try{!e&&r.return&&r.return()}finally{if(a)throw n}}this.$store.commit("initial",t)}},computed:{cartKey:function(){return this.$localStorage.get("cartKey")}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"CartItem",props:{data:{}},computed:{totalPrice:function(){return(this.data.price*this.data.amount).toFixed(2)}},methods:{deleteFromCart:function(){this.$emit("productDeleted",this.data)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(82),s=a.n(n);e.default={components:{ProductList:s.a},name:"index",data:function(){return{}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"PageHeader",computed:{cartCount:function(){return this.$store.state.count},cartKey:function(){return this.$localStorage.get("cartKey")}},mounted:function(){var t=this;null!==this.cartKey&&this.$http.get("/api/cart/itemcount/"+this.cartKey).then(function(e){t.$store.commit("initial",e.body.amount)},function(e){console.log("FEHLER AUFGETRETEN",e),t.loading=!1})}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"TopBar",data:function(){return{}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Amount",data:function(){return{amount:1}},methods:{increaseAmount:function(){this.amount+=1,this.$emit("amountChanged",this.amount)},decreaseAmount:function(){this.amount-1!=0&&(this.amount-=1,this.$emit("amountChanged",this.amount))}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(83),s=a.n(n),i=a(80),r=a.n(i);e.default={components:{variant:s.a,amount:r.a},name:"Product",data:function(){return{price:this.data.basePrice,amount:1,variant:null,basePrice:this.data.basePrice,loading:!1}},props:{data:{}},methods:{hasImages:function(){return this.data.images.length>0},hasVariants:function(){return this.data.variants.length>1},variantHasChanged:function(t){this.variant=t,this.calculatePrice()},amountHasChanged:function(t){this.amount=t,this.calculatePrice()},calculatePrice:function(){null===this.variant?this.price=this.basePrice:this.price=this.variant.price},addToCart:function(){var t=this;this.loading=!0;var e={productId:this.data.id,amount:this.amount,price:this.price,variant:this.variant};this.$http.post("/api/cart/"+this.cartKey,e).then(function(e){t.loading=!1,t.$store.commit("increment",t.amount)},function(e){console.log(e),t.loading=!1})}},computed:{totalPrice:function(){return parseFloat(this.price*this.amount).toFixed(2)},outputPrice:function(){return this.totalPrice+" €"},cartKey:function(){return this.$localStorage.get("cartKey")}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(81),s=a.n(n);e.default={components:{Product:s.a},name:"ProductList",data:function(){return{products:[],loading:!1}},created:function(){var t=this;this.loading=!0,this.$http.get("/api/product").then(function(e){t.products=e.body,t.loading=!1},function(e){e&&alert("Es ist ein Fehler aufgetreten!"),t.loading=!1})}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(95),s=a.n(n);e.default={components:{vSelect:s.a},name:"Variant",data:function(){return{}},props:{variants:{}},methods:{changeVariant:function(t){this.$emit("variantChanged",this.variants[t.value])}},created:function(){this.variants.forEach(function(t,e){t.label=t.name,t.value=e})}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e,a){t.exports=a.p+"static/img/logo_sfb.afac918.png"},function(t,e,a){var n=a(0)(a(32),a(93),null,null,null);t.exports=n.exports},function(t,e,a){var n=a(0)(a(33),a(90),null,null,null);t.exports=n.exports},function(t,e,a){function n(t){a(73)}var s=a(0)(a(34),a(92),n,"data-v-c188c688",null);t.exports=s.exports},function(t,e,a){function n(t){a(72)}var s=a(0)(a(35),a(87),n,"data-v-558cb7ab",null);t.exports=s.exports},function(t,e,a){var n=a(0)(a(36),a(91),null,null,null);t.exports=n.exports},function(t,e,a){var n=a(0)(a(37),a(85),null,null,null);t.exports=n.exports},function(t,e,a){var n=a(0)(a(38),a(86),null,null,null);t.exports=n.exports},function(t,e,a){var n=a(0)(a(39),a(88),null,null,null);t.exports=n.exports},function(t,e,a){var n=a(0)(a(40),a(89),null,null,null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("top-bar"),t._v(" "),a("page-header"),t._v(" "),a("router-view"),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",[a("div",{staticClass:"copyrights"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-6"},[a("p",[t._v("© 2017 Sportfreunde Bronnen 1949 e.V.")])]),t._v(" "),a("div",{staticClass:"col-sm-6 text-right"},[t._v("\n            Made with <3 in Laupheim\n          ")])])])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"product-quantity"},[a("div",{staticClass:"minus-btn",on:{click:t.decreaseAmount}},[a("i",{staticClass:"icon-android-remove"})]),t._v(" "),a("input",{staticClass:"quantity",attrs:{type:"text"},domProps:{value:t.amount}}),t._v(" "),a("div",{staticClass:"plus-btn",on:{click:t.increaseAmount}},[a("i",{staticClass:"icon-android-add"})])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"big-product"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-4 product"},[t.hasImages()?a("img",{staticClass:"img-responsive",attrs:{src:t.data.images[0].name,alt:"t-shirt"}}):t._e()]),t._v(" "),a("div",{staticClass:"col-sm-8 info"},[a("div",{staticClass:"info-wrapper"},[a("h2",[t._v(t._s(t.data.name))]),t._v(" "),a("p",{staticClass:"lead"},[t._v("\n                        "+t._s(t.data.description)+"\n                    ")]),t._v(" "),a("ul",{staticClass:"product-info list-unstyled"},[t.hasVariants()?a("li",{staticClass:"size"},[a("variant",{attrs:{variants:t.data.variants},on:{variantChanged:t.variantHasChanged}})],1):t._e(),t._v(" "),a("li",{staticClass:"amount"},[a("amount",{on:{amountChanged:t.amountHasChanged}})],1),t._v(" "),a("li",{staticClass:"price"},[t._v("\n                            "+t._s(t.outputPrice)+"\n                        ")])])]),t._v(" "),t.loading?t._e():a("a",{staticClass:"add-to-cart btn btn-unique",on:{click:function(e){e.preventDefault(),t.addToCart(e)}}},[t._v("In den Warenkorb "),a("i",{staticClass:"icon-cart-1"})]),t._v(" "),t.loading?a("a",{staticClass:"add-to-cart btn btn-unique",attrs:{href:"#"}},[t._v("Einen Moment bitte.. "),a("i",{staticClass:"icon-cart-1"})]):t._e()])])])])},staticRenderFns:[]}},function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"header"},[n("nav",{staticClass:"navbar navbar-default"},[n("div",{staticClass:"container"},[n("div",{staticClass:"navbar-header"},[n("router-link",{staticClass:"navbar-brand",attrs:{to:{name:"index"}}},[n("img",{staticClass:"sfb-logo",attrs:{src:a(74),alt:"SFB Merchandising"}})]),t._v(" "),t._m(0)],1),t._v(" "),n("div",{staticClass:"collapse navbar-collapse navbar-right",attrs:{id:"navigation"}},[n("ul",{staticClass:"nav navbar-nav"},[n("li",{staticClass:"active"},[n("router-link",{attrs:{to:{name:"index"}}},[t._v("Startseite")])],1),t._v(" "),n("li",[n("router-link",{staticClass:"cart",attrs:{to:{name:"shoppingcart"}}},[n("i",{staticClass:"icon-cart-1"}),t._v(" "),n("span",{staticClass:"items"},[t._v(t._s(t.cartCount))])])],1)])])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"navbar-buttons"},[a("button",{staticClass:"navbar-toggle navbar-btn",attrs:{type:"button","data-toggle":"collapse","data-target":".navbar-collapse"}},[t._v("Menu"),a("i",{staticClass:"fa fa-align-justify"})])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"div-product-list"}},[t.loading?a("div",{staticClass:"text-center"},[a("h3",[t._v("Produkte werden geladen. Bitte einen Moment Geduld.")])]):t._e(),t._v(" "),t.loading?t._e():a("div",{attrs:{id:"product-list"}},t._l(t.products,function(t){return a("product",{key:t.id,attrs:{data:t}})}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"variant-selector"},[a("v-select",{attrs:{"on-change":t.changeVariant,options:t.variants}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cart-item"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-6"},[a("div",{staticClass:"product-overview clearfix"},[a("div",{staticClass:"product-img pull-left"},[t.data.product.images.length>0?a("img",{staticClass:"img-responsive",attrs:{src:t.data.product.images[0].name,alt:"t-shirt"}}):t._e(),t._v(" "),0==t.data.product.images.length?a("h3",[t._v("Kein Bild")]):t._e()]),t._v(" "),a("div",{staticClass:"product-details pull-left"},[a("h3",[t._v(t._s(t.data.product.name))]),t._v(" "),null!==t.data.variant?a("p",[t._v(t._s(t.data.variant.name))]):t._e()])])]),t._v(" "),a("div",{staticClass:"col-xs-2"},[a("h3",[t._v(t._s(t.data.price)+" €")])]),t._v(" "),a("div",{staticClass:"col-xs-2"},[a("div",{staticClass:"product-quantity"},[a("h3",[t._v(t._s(t.data.amount)+"x")])])]),t._v(" "),a("div",{staticClass:"col-xs-2"},[a("h3",[t._v(t._s(t.totalPrice)+" €")])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12 text-left"},[a("br"),a("a",{staticClass:"cursor-pointer",on:{click:function(e){e.preventDefault(),t.deleteFromCart(e)}}},[t._v("Artikel aus Warenkorb entfernen")]),t._v(" "),a("hr")])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"top-bar hidden-sm hidden-xs"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-6 text-left"},[a("p",[t._v("Shop für Vereinsartikel der Sportfreunde Bronnen")])]),t._v(" "),a("div",{staticClass:"col-sm-6 text-right"},[a("p",[t._v("Fragen? shop@sf-bronnen.de")])])])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"hello"}},[t._m(0),t._v(" "),t._m(1),t._v(" "),a("product-list"),t._v(" "),t._m(2),t._v(" "),t._m(3)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"home-hero"},[a("div",{staticClass:"container"},[a("div",{staticClass:"text"},[a("div",{staticClass:"content"},[a("h1",[t._v("Vereinsartikel")]),t._v(" "),a("p",{staticClass:"hero-text"},[t._v("der Sportfreunde Bronnen 1949 e.V. "),a("strong",[t._v("einfach, schnell und sicher")]),t._v(" bestellen.")])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"intro"},[a("div",{staticClass:"container text-center"},[a("h2",{staticClass:"heading-center"},[t._v("Unsere Produkte")]),t._v(" "),a("p",{staticClass:"lead"},[t._v('\n        Im Folgenden erhalten Sie eine Auswahl der verfügbaren Vereinsartikel. Nach Auswahl der entsprechenden Größe (falls vorhanden)\n        genügt ein Klick auf "In den Warenkorb", um das Produkt Ihrem Warenkorb hinzuzufügen.\n      ')])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"services"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"service"},[a("div",{staticClass:"icon"},[a("i",{staticClass:"icon-prev"})]),t._v(" "),a("div",{staticClass:"text"},[a("h4",[t._v("#nurdiesfb")])])])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"contact"},[a("div",{staticClass:"container text-center"},[a("h2",{staticClass:"heading-center"},[t._v("Kontaktmöglichkeiten")]),t._v(" "),a("p",{staticClass:"lead"},[t._v("\n        Bei Fragen zum Shop, Wünschen nach neuen Artikeln und allen weiteren Anfragen nutzen Sie bitte\n        die E-Mail Adresse "),a("strong",[t._v("shop@sf-bronnen.de")]),t._v(".\n      ")])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cart-page-holder"},[t._m(0),t._v(" "),this.hasItems()?a("section",{staticClass:"cart"},[a("div",{staticClass:"container"},[t.loading?a("div",{staticClass:"text-center"},[a("h3",[t._v("Produkte werden geladen. Bitte einen Moment Geduld.")])]):t._e(),t._v(" "),t.loading?t._e():a("div",{staticClass:"cart-holder"},[t._m(1),t._v(" "),a("div",{staticClass:"cart-body"},t._l(t.cart.items,function(e){return a("cart-item",{key:e.id,ref:"cartItem",refInFor:!0,attrs:{data:e},on:{productDeleted:t.productDeleted}})}))])]),t._v(" "),a("div",{staticClass:"total-price text-right"},[a("div",{staticClass:"container"},[a("h2",{staticClass:"text-primary"},[t._v("Gesamt: "+t._s(t.calculateTotalAmount())+" €")])])])]):t._e(),t._v(" "),this.hasItems()?t._e():a("section",[t._m(2)])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"hero"},[a("div",{staticClass:"container"},[a("h1",[t._v("Ihr Warenkorb")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cart-heading"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-6"},[t._v("Product")]),t._v(" "),a("div",{staticClass:"col-xs-2"},[t._v("Price")]),t._v(" "),a("div",{staticClass:"col-xs-2"},[t._v("Quantity")]),t._v(" "),a("div",{staticClass:"col-xs-2"},[t._v("Total")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"col-xs-12"},[t._v("\n                Ihr Warenkorb ist leer.\n            ")])])}]}},,,,,function(t,e){}]),[30]);
//# sourceMappingURL=app.87562a8becc97a85449e.js.map