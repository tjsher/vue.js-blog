<template>
    <waterfall :line-gap="400" :watch="items" style="width: 100%;">
        <!-- each component is wrapped by a waterfall slot -->
        <waterfall-slot v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index" :key="item.id">
            <img :src="item.src" style="height: 100%;width: 100%;">
        </waterfall-slot>
    </waterfall>
</template>
<script type="text/javascript">
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

/*
 * or use ES5 code (vue-waterfall.min.js) :
 * import { Waterfall, WaterfallSlot } from 'vue-waterfall'
 */

export default {
    components: {
        Waterfall,
        WaterfallSlot
    },

    data() {
        return {
            src: require("../assets/wlop1.jpg"),
            items: [],

        }
    },
    created() {
        this.getImg();
    },
    methods: {
        getImg: function() {
            console.log("getImg");
            let self = this,
                id = "",
                width = "50",
                height = "";
            for (var i = 0; i < 50; i++) {
                id = String(i);
                let src = "../assets/wlop" + id + ".jpg";
                height = Math.random() * 50;
                if (height < 25)
                    height = 25;
                height = String(height);
                self.items.push({ id: id, width: width, height: height, src: require("../assets/wlop" + id + ".jpg") });
            }
        },

    },
}
</script>