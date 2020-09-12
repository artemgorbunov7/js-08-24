const app = new Vue({
    el: '#app',
    data: {
        name: 'GeekBrains',
        lastName: 'Ivanov',
        isChecked: true,
        items: [
            'Компьютер',
            'Мышь',
            'Монитор',
            'Клавиатура',
        ],
    },
    created() {
        console.log('vue created');
        this.fetchData();
    },
    computed: {
        upperCasedName() {
            return this.name.toUpperCase();
        },
        fullName() {
            return `${this.name} ${this.lastName}`;
        },
    },
    methods: {
        doSomething(event) {
            console.log(this.name);
            console.log('something');
        },
        toUpperCase(item) {
            return item.toUpperCase();
        },
        fetchData() {
            // fetch('/api')
            //     .then(res => res.json())
            //     .then(res => {
            //         this.item = res;
            //     })
        },
    },
});

console.log(app);
