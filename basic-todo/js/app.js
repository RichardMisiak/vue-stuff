const app = new Vue({
    el: '#app',
    data: {
        input: '',
        items: [],
    },
    methods: {
        isInputValid: function () {
            return this.input.trim().length;
        },
        loadItems: function () {
            const raw = localStorage['vue.items'];
            try {
                const parsed = JSON.parse(raw);
                this.items = Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                this.items = [];
            };
        },
        submit: function () {
            if (!this.isInputValid()) {
                return;
            }

            this.items.push({ text: this.input.trim() });
            this.input = '';
            localStorage['vue.items'] = JSON.stringify(this.items);
        },
        remove: function (index) {
            this.items.splice(index, 1);
            localStorage['vue.items'] = JSON.stringify(this.items);
        }
    }
});

app.loadItems();
