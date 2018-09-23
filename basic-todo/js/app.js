Vue.component('todo-title', {
    template: `
        <div>
            <h3>
                You have {{count}} {{count === 1 ? 'item' : 'items'}}
            </h3>
        </div>
    `,
    props: ['count']
})

Vue.component('todo-item', {
    template: `
        <div class="item">
            <div>{{item.text}}</div>
            <i v-on:click="remove()" class="fas fa-times clickable"></i>
        </div>
    `,
    props: ['item'],
    methods: {
        remove: function () {
            this.$emit('remove');
        }
    }
});

Vue.component('todo-input', {
    template: `
    <div class="input-container">
        <input class="input" v-model="input" v-on:keyup.enter="submit()">
        <span v-if="isInputValid()" class="fas fa-plus clickable btn-add" v-on:click="submit()"></span>
    </div>
    `,
    data: function () {
        return {
            input: ''
        }
    },
    methods: {
        isInputValid: function () {
            return this.input.trim().length;
        },

        submit: function () {
            if (!this.isInputValid()) {
                return;
            }

            this.$emit('submit', this.input.trim());
            this.input = '';
        }
    }
});

const app = new Vue({
    el: '#app',
    data: {
        input: '',
        items: [],
    },
    created: function () {
        const raw = localStorage['vue.items'];
        try {
            const parsed = JSON.parse(raw);
            this.items = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            this.items = [];
        };
    },
    methods: {
        add: function (value) {
            this.items.push({ text: value });
            localStorage['vue.items'] = JSON.stringify(this.items);
        },
        remove: function (index) {
            this.items.splice(index, 1);
            localStorage['vue.items'] = JSON.stringify(this.items);
        }
    },
});
