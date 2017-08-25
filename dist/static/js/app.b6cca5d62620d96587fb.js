webpackJsonp([1],Array(25).concat([function(e,t,a){"use strict";var r=a(15),s=a(97),i=a(78),n=a.n(i),o=a(76),c=a.n(o);r.a.use(s.a),t.a=new s.a({routes:[{path:"/",name:"index",component:n.a},{path:"/warenkorb",name:"shoppingcart",component:c.a}]})},,function(e,t,a){function r(e){a(73)}var s=a(0)(a(32),a(87),r,null,null);e.exports=s.exports},,,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(15),s=a(29),i=a(28),n=a.n(i),o=a(30),c=a(26),l=a.n(c),u=a(27),d=a.n(u),v=a(25);r.a.config.productionTip=!1,r.a.use(o.a),r.a.use(s.a),r.a.use(n.a),r.a.use(l.a,{initial:!0}),r.a.http.interceptors.push(function(e,t){e.headers.set("Content-Type","application/json"),t()});var m=new o.a.Store({state:{count:0,categoryFilter:0},mutations:{increment:function(e,t){e.count+=t},initial:function(e,t){e.count=t},filterCategory:function(e,t){e.categoryFilter=t}}});new r.a({el:"#app",router:v.a,store:m,template:"<App/>",components:{App:d.a}})},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(80),s=a.n(r),i=a(79),n=a.n(i);t.default={components:{TopBar:s.a,PageHeader:n.a},name:"app",created:function(){this.cartKeyHandling()},updated:function(){this.cartKeyHandling()},methods:{cartKeyHandling:function(){var e=this;null===this.$localStorage.get("cartKey")&&this.$http.post("/api/cart",{}).then(function(t){e.$localStorage.set("cartKey",t.body.key)},function(e){console.log("FEHLER AUFGETRETEN",e)})}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(43),s=a.n(r),i=a(77),n=a.n(i);t.default={components:{CartItem:n.a},name:"CartPage",data:function(){return{cart:{},loading:!0,user:{variantDelivery:!1,delivery:{}},showErrorMessage:!1,cartCheckedOut:!1}},beforeCreate:function(){},mounted:function(){this.getItems()},methods:{productDeleted:function(e){var t=this;this.$http.delete("/api/cart/item/"+this.cartKey+"/"+e.id).then(function(e){e&&t.getItems()},function(e){return!1})},getItems:function(){var e=this;this.$http.get("/api/cart/"+this.cartKey).then(function(t){e.cart=t.body,e.loading=!1,e.calculateItemCount()},function(t){t&&(e.loading=!1)})},hasItems:function(){return void 0!==this.cart.items&&this.cart.items.length>0},calculateTotalAmount:function(){var e=0,t=!0,a=!1,r=void 0;try{for(var i,n=s()(this.cart.items);!(t=(i=n.next()).done);t=!0){var o=i.value;e+=o.price*o.amount}}catch(e){a=!0,r=e}finally{try{!t&&n.return&&n.return()}finally{if(a)throw r}}return e+=6,e.toFixed(2)},calculateItemCount:function(){var e=0,t=!0,a=!1,r=void 0;try{for(var i,n=s()(this.cart.items);!(t=(i=n.next()).done);t=!0){var o=i.value;e+=parseInt(o.amount,10)}}catch(e){a=!0,r=e}finally{try{!t&&n.return&&n.return()}finally{if(a)throw r}}this.$store.commit("initial",e)},submitForm:function(){var e=this;return this.$validator.validateAll().then(function(t){t?(e.showErrorMessage=!1,e.$http.post("/api/cart/checkout/"+e.cartKey,e.user).then(function(t){0===t.body.status&&(e.$localStorage.set("cartKey",t.body.newCartKey),e.cartCheckedOut=!0)},function(e){e&&console.log(e)})):e.showErrorMessage=!0}),!1}},computed:{cartKey:function(){return this.$localStorage.get("cartKey")},variantDeliveryAddressNeeded:function(){return!0===this.user.variantDelivery}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"CartItem",props:{data:{}},data:function(){return{deletion:!1}},computed:{totalPrice:function(){return(this.data.price*this.data.amount).toFixed(2)}},methods:{deleteFromCart:function(){this.deletion=!0,this.$emit("productDeleted",this.data)}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(84),s=a.n(r),i=a(82),n=a.n(i);t.default={components:{ProductFilter:n.a,ProductList:s.a},name:"index",data:function(){return{}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"PageHeader",computed:{cartCount:function(){return this.$store.state.count},cartKey:function(){return this.$localStorage.get("cartKey")}},mounted:function(){var e=this;null!==this.cartKey&&this.$http.get("/api/cart/itemcount/"+this.cartKey).then(function(t){e.$store.commit("initial",t.body.amount)},function(t){console.log("FEHLER AUFGETRETEN",t),e.loading=!1})}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"TopBar",data:function(){return{}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Amount",data:function(){return{amount:1}},methods:{increaseAmount:function(){this.amount+=1,this.$emit("amountChanged",this.amount)},decreaseAmount:function(){this.amount-1!=0&&(this.amount-=1,this.$emit("amountChanged",this.amount))}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"ProductFilter",data:function(){return{currentCategory:0}},props:{variants:{}},methods:{setFilter:function(e){this.$store.commit("filterCategory",e),this.currentCategory=e}},created:function(){}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(85),s=a.n(r),i=a(81),n=a.n(i);t.default={components:{variant:s.a,amount:n.a},name:"Product",data:function(){return{price:this.data.basePrice,amount:1,variant:null,basePrice:this.data.basePrice,loading:!1,variantError:!1}},props:{data:{}},methods:{hasImages:function(){return this.data.images.length>0},hasVariants:function(){return this.data.variants.length>1},isVariantSelected:function(){return this.hasVariants()&&null!==this.variant},variantHasChanged:function(e){this.variant=e,this.calculatePrice(),this.variantError=!1},amountHasChanged:function(e){this.amount=e,this.calculatePrice()},calculatePrice:function(){null===this.variant?this.price=this.basePrice:this.price=this.variant.price},addToCart:function(){var e=this;if(this.hasVariants()){if(!this.isVariantSelected())return void(this.variantError=!0);this.variantError=!1}this.loading=!0;var t={productId:this.data.id,amount:this.amount,price:this.price,variant:this.variant};this.$http.post("/api/cart/"+this.cartKey,t).then(function(t){e.loading=!1,e.$store.commit("increment",e.amount)},function(t){console.log(t),e.loading=!1})}},computed:{totalPrice:function(){return parseFloat(this.price*this.amount).toFixed(2)},outputPrice:function(){return this.totalPrice+" €"},cartKey:function(){return this.$localStorage.get("cartKey")}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(83),s=a.n(r);t.default={components:{Product:s.a},name:"ProductList",data:function(){return{products:[],loading:!1,currentCategory:0}},created:function(){var e=this;this.getProducts(0);var t=this;this.$store.subscribe(function(a){"filterCategory"===a.type&&a.payload!==t.currentCategory&&(e.getProducts(a.payload),t.currentCategory=a.payload)})},methods:{getProducts:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.loading=!0;var a="";a=t>0?"/api/product?category="+t:"/api/product",this.$http.get(a).then(function(t){e.products=t.body,e.loading=!1},function(t){t&&alert("Es ist ein Fehler aufgetreten!"),e.loading=!1})}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(98),s=a.n(r);t.default={components:{vSelect:s.a},name:"Variant",data:function(){return{}},props:{variants:{}},methods:{changeVariant:function(e){this.$emit("variantChanged",this.variants[e.value])}},created:function(){this.variants.forEach(function(e,t){e.label=e.name,e.value=t})}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t){},function(e,t){},function(e,t){},function(e,t,a){var r=a(0)(a(33),a(96),null,null,null);e.exports=r.exports},function(e,t,a){var r=a(0)(a(34),a(93),null,null,null);e.exports=r.exports},function(e,t,a){function r(e){a(75)}var s=a(0)(a(35),a(95),r,"data-v-c188c688",null);e.exports=s.exports},function(e,t,a){function r(e){a(74)}var s=a(0)(a(36),a(90),r,"data-v-558cb7ab",null);e.exports=s.exports},function(e,t,a){var r=a(0)(a(37),a(94),null,null,null);e.exports=r.exports},function(e,t,a){var r=a(0)(a(38),a(88),null,null,null);e.exports=r.exports},function(e,t,a){var r=a(0)(a(39),a(86),null,null,null);e.exports=r.exports},function(e,t,a){var r=a(0)(a(40),a(89),null,null,null);e.exports=r.exports},function(e,t,a){var r=a(0)(a(41),a(91),null,null,null);e.exports=r.exports},function(e,t,a){var r=a(0)(a(42),a(92),null,null,null);e.exports=r.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("hr"),e._v(" "),a("h3",{staticClass:"heading-center"},[e._v("Was darf es sein?")]),e._v(" "),a("a",{staticClass:"add-to-cart btn btn-unique",class:{active:0==e.currentCategory},on:{click:function(t){e.setFilter(0)}}},[e._v("Alles")]),e._v(" "),a("a",{staticClass:"add-to-cart btn btn-unique",class:{active:2==e.currentCategory},on:{click:function(t){e.setFilter(2)}}},[e._v("Was für den Kopf")]),e._v(" "),a("a",{staticClass:"add-to-cart btn btn-unique",class:{active:1==e.currentCategory},on:{click:function(t){e.setFilter(1)}}},[e._v("Was für den Astralkörper")]),e._v(" "),a("a",{staticClass:"add-to-cart btn btn-unique",class:{active:3==e.currentCategory},on:{click:function(t){e.setFilter(3)}}},[e._v("Egal. Hauptsache trinkbar")]),e._v(" "),a("hr")])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("top-bar"),e._v(" "),a("page-header"),e._v(" "),a("router-view"),e._v(" "),e._m(0)],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("footer",[a("div",{staticClass:"copyrights"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12 col-sm-6 text-center"},[a("p",[e._v("© 2017 Sportfreunde Bronnen 1949 e.V.")])]),e._v(" "),a("div",{staticClass:"col-xs-12 col-sm-6 text-center"},[a("p",[e._v("#nurdiesfb")])]),e._v(" "),a("div",{staticClass:"col-xs-12 text-center"},[a("a",{attrs:{href:"http://www.sf-bronnen.de/impressum.html"}},[e._v("Impressum")])])])])])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"product-quantity"},[a("div",{staticClass:"minus-btn",on:{click:e.decreaseAmount}},[a("i",{staticClass:"icon-android-remove"})]),e._v(" "),a("input",{staticClass:"quantity",attrs:{type:"text"},domProps:{value:e.amount}}),e._v(" "),a("div",{staticClass:"plus-btn",on:{click:e.increaseAmount}},[a("i",{staticClass:"icon-android-add"})])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"big-product"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-4 product"},[e.hasImages()?a("img",{staticClass:"img-responsive",attrs:{src:e.data.images[0].name,alt:"t-shirt"}}):e._e()]),e._v(" "),a("div",{staticClass:"col-sm-8 info"},[a("div",{staticClass:"info-wrapper"},[a("h2",[e._v(e._s(e.data.name))]),e._v(" "),a("p",{staticClass:"lead"},[e._v("\n                        "+e._s(e.data.description)+"\n                    ")]),e._v(" "),this.variantError?a("div",{staticClass:"alert alert-danger col-xs-12 col-sm-6"},[e._v("Bitte wähle eine Größe aus.")]):e._e(),e._v(" "),a("ul",{staticClass:"product-info list-unstyled has-error"},[e.hasVariants()?a("li",{staticClass:"size has-error"},[a("variant",{attrs:{variants:e.data.variants},on:{variantChanged:e.variantHasChanged}})],1):e._e(),e._v(" "),a("li",{staticClass:"amount"},[a("amount",{on:{amountChanged:e.amountHasChanged}})],1),e._v(" "),a("li",{staticClass:"price"},[e._v("\n                            "+e._s(e.outputPrice)+"\n                        ")])])]),e._v(" "),e.loading?e._e():a("a",{staticClass:"add-to-cart btn btn-unique",on:{click:function(t){t.preventDefault(),e.addToCart(t)}}},[e._v("In den Warenkorb "),a("i",{staticClass:"icon-cart-1"})]),e._v(" "),e.loading?a("a",{staticClass:"add-to-cart btn btn-unique",attrs:{href:"#"}},[e._v("Einen Moment bitte.. "),a("i",{staticClass:"icon-cart-1"})]):e._e()])])])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("header",{staticClass:"header"},[a("nav",{staticClass:"navbar navbar-default"},[a("div",{staticClass:"container"},[a("div",{staticClass:"navbar-header"},[a("router-link",{staticClass:"navbar-brand",attrs:{to:{name:"index"}}}),e._v(" "),e._m(0)],1),e._v(" "),a("div",{staticClass:"collapse navbar-collapse navbar-right",attrs:{id:"navigation"}},[a("ul",{staticClass:"nav navbar-nav"},[a("li",{staticClass:"sfb hidden-xs"},[a("router-link",{attrs:{to:{name:"index"}}},[e._v("Sportfreunde Bronnen 1949 e.V.")])],1),e._v(" "),a("li",{},[a("router-link",{attrs:{to:{name:"index"}}},[e._v("Produkte")])],1),e._v(" "),a("li",[a("router-link",{staticClass:"cart",attrs:{to:{name:"shoppingcart"}}},[a("i",{staticClass:"icon-cart-1"}),e._v(" "),a("span",{staticClass:"items"},[e._v(e._s(e.cartCount))])])],1)])])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"navbar-buttons"},[a("button",{staticClass:"navbar-toggle navbar-btn",attrs:{type:"button","data-toggle":"collapse","data-target":".navbar-collapse"}},[e._v("Menu"),a("i",{staticClass:"fa fa-align-justify"})])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"div-product-list"}},[a("transition",{attrs:{name:"fade"}},[e.loading?a("div",{key:"loading",staticClass:"text-center"},[a("h3",[e._v("Produkte werden geladen. Bitte einen Moment Geduld.")])]):e._e(),e._v(" "),e.loading?e._e():a("div",{key:"list",attrs:{id:"product-list"}},e._l(e.products,function(e){return a("product",{key:e.id,attrs:{data:e}})}))])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"variant-selector"},[a("v-select",{attrs:{"on-change":e.changeVariant,options:e.variants,searchable:!1,placeholder:"Größe wählen"}})],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cart-item"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-6"},[a("div",{staticClass:"product-overview clearfix"},[a("div",{staticClass:"product-img pull-left"},[e.data.product.images.length>0?a("img",{staticClass:"img-responsive",attrs:{src:e.data.product.images[0].name,alt:"t-shirt"}}):e._e(),e._v(" "),0==e.data.product.images.length?a("h3",[e._v("Kein Bild")]):e._e()]),e._v(" "),a("div",{staticClass:"product-details pull-left"},[a("h3",[e._v(e._s(e.data.product.name))]),e._v(" "),null!==e.data.variant?a("p",[e._v(e._s(e.data.variant.name))]):e._e()])])]),e._v(" "),a("div",{staticClass:"col-xs-2"},[a("h3",[e._v(e._s(e.data.price)+" €")])]),e._v(" "),a("div",{staticClass:"col-xs-2"},[a("div",{staticClass:"product-quantity"},[a("h3",[e._v(e._s(e.data.amount)+"x")])])]),e._v(" "),a("div",{staticClass:"col-xs-2"},[a("h3",[e._v(e._s(e.totalPrice)+" €")])])]),e._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12 text-left"},[a("br"),e._v(" "),this.deletion?e._e():a("a",{staticClass:"cursor-pointer",on:{click:function(t){t.preventDefault(),e.deleteFromCart(t)}}},[e._v("Artikel aus Warenkorb entfernen")]),e._v(" "),this.deletion?a("a",[e._v("Artikel wird entfernt...")]):e._e(),e._v(" "),a("hr")])])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"top-bar hidden-sm hidden-xs"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-6 text-left"},[a("p",[e._v("Shop für Vereinsartikel der Sportfreunde Bronnen")])]),e._v(" "),a("div",{staticClass:"col-sm-6 text-right"},[a("p",[e._v("Fragen? shop@sf-bronnen.de")])])])])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"hello"}},[e._m(0),e._v(" "),a("section",{staticClass:"intro"},[a("div",{staticClass:"container text-center"},[a("h2",{staticClass:"heading-center"},[e._v("Unsere Produkte")]),e._v(" "),a("p",{staticClass:"lead"},[e._v('\n        Im Folgenden erhalten Sie eine Auswahl der verfügbaren Vereinsartikel. Nach Auswahl der entsprechenden Größe (falls vorhanden)\n        genügt ein Klick auf "In den Warenkorb", um das Produkt Ihrem Warenkorb hinzuzufügen.\n      ')]),e._v(" "),a("product-filter")],1)]),e._v(" "),a("product-list"),e._v(" "),e._m(1),e._v(" "),e._m(2)],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"home-hero"},[a("div",{staticClass:"container"},[a("div",{staticClass:"text"},[a("div",{staticClass:"content"},[a("h1",[e._v("Vereinsartikel")]),e._v(" "),a("p",{staticClass:"hero-text"},[e._v("der Sportfreunde Bronnen 1949 e.V. "),a("strong",[e._v("einfach, schnell und sicher")]),e._v(" bestellen.")])])])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"services"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"service"},[a("div",{staticClass:"icon"},[a("i",{staticClass:"icon-prev"})]),e._v(" "),a("div",{staticClass:"text"},[a("h4",[e._v("#nurdiesfb")])])])])])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"contact"},[a("div",{staticClass:"container text-center"},[a("h2",{staticClass:"heading-center"},[e._v("Kontaktmöglichkeiten")]),e._v(" "),a("p",{staticClass:"lead"},[e._v("\n        Bei Fragen zum Shop, Wünschen nach neuen Artikeln und allen weiteren Anfragen nutzen Sie bitte\n        die E-Mail Adresse "),a("strong",[e._v("shop@sf-bronnen.de")]),e._v(".\n      ")])])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cart-page-holder"},[e._m(0),e._v(" "),this.loading&&!this.cartCheckedOut?a("section",{staticClass:"cart",staticStyle:{"padding-top":"50px","padding-bottom":"200px"}},[a("div",{staticClass:"container"},[e.loading?a("div",{staticClass:"text-center"},[a("h3",[e._v("Warenkorb wird geladen")])]):e._e()])]):e._e(),e._v(" "),this.cartCheckedOut?a("section",{staticClass:"cart",staticStyle:{"padding-top":"0","padding-bottom":"200px"}},[e._m(1)]):e._e(),e._v(" "),this.hasItems()&&!this.cartCheckedOut?a("section",{staticClass:"cart"},[a("div",{staticClass:"container"},[e.loading?a("div",{staticClass:"text-center"},[a("h3",[e._v("Produkte werden geladen. Bitte einen Moment Geduld.")])]):e._e(),e._v(" "),e.loading?e._e():a("div",{staticClass:"cart-holder"},[e._m(2),e._v(" "),a("div",{staticClass:"cart-body"},[e._l(e.cart.items,function(t){return a("cart-item",{key:t.id,ref:"cartItem",refInFor:!0,attrs:{data:t},on:{productDeleted:e.productDeleted}})}),e._v(" "),e._m(3)],2)])]),e._v(" "),a("div",{staticClass:"total-price text-right"},[a("div",{staticClass:"container"},[a("h2",{staticClass:"text-primary"},[e._v("Gesamt: "+e._s(e.calculateTotalAmount())+" €")])])])]):e._e(),e._v(" "),this.hasItems()||this.loading?e._e():a("section",[e._m(4)]),e._v(" "),this.hasItems()&&!this.cartCheckedOut?a("section",{staticClass:"shipping"},[a("div",{staticClass:"container"},[a("div",{staticClass:"form-holder"},[a("div",{staticClass:"shipping-main"},[a("h3",[e._v("Rechnungsadresse")]),e._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12"},[e.showErrorMessage?a("div",{staticClass:"alert alert-danger"},[e._v("\n                                Bitte vervollständige die rot umrandeten Angaben.\n                            ")]):e._e()]),e._v(" "),a("div",{staticClass:"col-sm-6",class:{"has-error":e.errors.has("firstname")}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.firstname,expression:"user.firstname"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{type:"text",name:"firstname",placeholder:"Vorname","aria-required":"true"},domProps:{value:e.user.firstname},on:{input:function(t){t.target.composing||(e.user.firstname=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-sm-6",class:{"has-error":e.errors.has("lastname")}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.lastname,expression:"user.lastname"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{type:"text",name:"lastname",placeholder:"Nachname",required:"required","aria-required":"true"},domProps:{value:e.user.lastname},on:{input:function(t){t.target.composing||(e.user.lastname=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-sm-6",class:{"has-error":e.errors.has("email")}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.email,expression:"user.email"},{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"form-control",attrs:{type:"email",name:"email",placeholder:"E-Mail Addresse",required:"required","aria-required":"true"},domProps:{value:e.user.email},on:{input:function(t){t.target.composing||(e.user.email=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-sm-6",class:{"has-error":e.errors.has("phone")}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.phone,expression:"user.phone"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{type:"text",name:"phone",placeholder:"Telefon (für Rückfragen)",required:"","aria-required":"true"},domProps:{value:e.user.phone},on:{input:function(t){t.target.composing||(e.user.phone=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-sm-6",class:{"has-error":e.errors.has("street")}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.street,expression:"user.street"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{type:"text",name:"street",placeholder:"Straße/Hausnummer",required:"","aria-required":"true"},domProps:{value:e.user.street},on:{input:function(t){t.target.composing||(e.user.street=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-sm-2",class:{"has-error":e.errors.has("zip")}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.zipcode,expression:"user.zipcode"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{type:"text",name:"zip",placeholder:"PLZ",maxlength:"5",required:"","aria-required":"true"},domProps:{value:e.user.zipcode},on:{input:function(t){t.target.composing||(e.user.zipcode=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-sm-4",class:{"has-error":e.errors.has("city")}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.city,expression:"user.city"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{type:"text",name:"city",placeholder:"Ort",required:"","aria-required":"true"},domProps:{value:e.user.city},on:{input:function(t){t.target.composing||(e.user.city=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-sm-12"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.variantDelivery,expression:"user.variantDelivery"}],attrs:{type:"checkbox",id:"another-address"},domProps:{checked:Array.isArray(e.user.variantDelivery)?e._i(e.user.variantDelivery,null)>-1:e.user.variantDelivery},on:{__c:function(t){var a=e.user.variantDelivery,r=t.target,s=!!r.checked;if(Array.isArray(a)){var i=e._i(a,null);s?i<0&&(e.user.variantDelivery=a.concat(null)):i>-1&&(e.user.variantDelivery=a.slice(0,i).concat(a.slice(i+1)))}else e.user.variantDelivery=s}}}),e._v(" "),a("label",{attrs:{for:"another-address"}},[e._v("Abweichende Lieferadresse?")])])])]),e._v(" "),a("transition",{attrs:{name:"fade"}},[this.variantDeliveryAddressNeeded?a("div",{staticClass:"shipping-alternative"},[a("h3",[e._v("Lieferadresse")]),e._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-6",class:{"has-error":e.errors.has("delivery-firstname")}},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:e.user.variantDelivery?"required":"",expression:"`${user.variantDelivery ? 'required' : ''}`"},{name:"model",rawName:"v-model",value:e.user.delivery.firstname,expression:"user.delivery.firstname"}],staticClass:"form-control",attrs:{type:"text",name:"delivery-firstname",placeholder:"Vorname",required:"required","aria-required":"true"},domProps:{value:e.user.delivery.firstname},on:{input:function(t){t.target.composing||(e.user.delivery.firstname=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-sm-6",class:{"has-error":e.errors.has("delivery-lastname")}},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:e.user.variantDelivery?"required":"",expression:"`${user.variantDelivery ? 'required' : ''}`"},{name:"model",rawName:"v-model",value:e.user.delivery.lastname,expression:"user.delivery.lastname"}],staticClass:"form-control",attrs:{type:"text",name:"delivery-lastname",placeholder:"Nachname",required:"required","aria-required":"true"},domProps:{value:e.user.delivery.lastname},on:{input:function(t){t.target.composing||(e.user.delivery.lastname=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-sm-6",class:{"has-error":e.errors.has("delivery-street")}},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:e.user.variantDelivery?"required":"",expression:"`${user.variantDelivery ? 'required' : ''}`"},{name:"model",rawName:"v-model",value:e.user.delivery.street,expression:"user.delivery.street"}],staticClass:"form-control",attrs:{type:"text",name:"delivery-street",placeholder:"Straße/Hausnummer",required:"","aria-required":"true"},domProps:{value:e.user.delivery.street},on:{input:function(t){t.target.composing||(e.user.delivery.street=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-sm-2",class:{"has-error":e.errors.has("delivery-zip")}},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:e.user.variantDelivery?"required":"",expression:"`${user.variantDelivery ? 'required' : ''}`"},{name:"model",rawName:"v-model",value:e.user.delivery.zipcode,expression:"user.delivery.zipcode"}],staticClass:"form-control",attrs:{type:"text",name:"delivery-zip",placeholder:"PLZ",maxlength:"5",required:"","aria-required":"true"},domProps:{value:e.user.delivery.zipcode},on:{input:function(t){t.target.composing||(e.user.delivery.zipcode=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"col-sm-4",class:{"has-error":e.errors.has("delivery-city")}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.delivery.city,expression:"user.delivery.city"},{name:"validate",rawName:"v-validate",value:e.user.variantDelivery?"required":"",expression:"`${user.variantDelivery ? 'required' : ''}`"}],staticClass:"form-control",attrs:{type:"text",name:"delivery-city",placeholder:"Ort",required:"","aria-required":"true"},domProps:{value:e.user.delivery.city},on:{input:function(t){t.target.composing||(e.user.delivery.city=t.target.value)}}})])])]):e._e()]),e._v(" "),e._m(5),e._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12 text-center"},[a("button",{staticClass:"oder-now btn btn-unique",attrs:{type:"submit",id:"shipping-submit"},on:{click:function(t){t.preventDefault(),e.submitForm()}}},[a("i",{staticClass:"icon-shipping-truck"}),e._v(" Kostenpflichtig bestellen")])])])],1)])]):e._e()])},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"hero"},[a("div",{staticClass:"container"},[a("h1",[e._v("Ihr Warenkorb")])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12"},[a("div",{staticClass:"alert alert-success"},[e._v("\n                        Vielen Dank für Ihre Bestellung. Für Details zur Lieferung und Bezahlung erhalten Sie in Kürze eine E-Mail. Ihre Sportfreunde!\n                    ")])])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cart-heading"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-6"},[e._v("Artikel")]),e._v(" "),a("div",{staticClass:"col-xs-2"},[e._v("Preis")]),e._v(" "),a("div",{staticClass:"col-xs-2"},[e._v("Anzahl")]),e._v(" "),a("div",{staticClass:"col-xs-2"},[e._v("Betrag")])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cart-item"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-10"},[a("div",{staticClass:"product-overview clearfix"},[a("h3",[e._v("Versandkostenpauschale")])])]),e._v(" "),a("div",{staticClass:"col-xs-2"},[a("h3",[e._v("6.00 €")])])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"col-xs-12"},[e._v("\n                Ihr Warenkorb ist leer.\n            ")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"payment-method"},[a("hr"),e._v(" "),a("h3",[e._v("Bezahlung/Versand")]),e._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12"},[e._v("\n                            Die Bezahlung erfolgt per Vorkasse. Hierzu erhalten Sie im Anschluss an Ihre eine E-Mail mit der Kontoverbindung. Da jedes Produkt individuell für Sie\n                            gefertigt wird, beträgt die Lieferzeit aktuell "),a("b",[e._v("vier Wochen")]),e._v(".\n                        ")])])])}]}},,,,,function(e,t){}]),[31]);
//# sourceMappingURL=app.b6cca5d62620d96587fb.js.map