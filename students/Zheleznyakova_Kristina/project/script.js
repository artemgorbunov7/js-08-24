class GoodsItem 
{
    constructor({ product_name, price }) 
    {
        this.product_name = product_name;
        this.price = price;
    }

    render() 
    {
        return `
            <div class="goods-item">
                <h3>${this.product_name}</h3>
                <p>${this.price}</p>
                <button class='btn_inBasket'>В корзину</button>
            </div>
        `;
    }
}


const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) 
{
    return new Promise((resolve) => 
    {
        var xhr;

        if (window.XMLHttpRequest) 
        {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) 
        {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.open('GET', url, true);
        xhr.send();
        
        xhr.onreadystatechange = () => {if (xhr.readyState === 4) resolve(xhr.responseText)};
    })
}


class GoodsList 
{
    constructor() 
    {
        this.goods = [];
    }

    fetchGoods() 
    {
        return new Promise((resolve, reject) => 
        {
            let x = makeGETRequest(`${API_URL}/catalogData.json`);

            try        { resolve(x); }
            catch(err) { reject(err); }
        })

    }
        
    render() 
    {
        let listHtml = '';

        this.goods.forEach(good => 
        {
            const goodItem = new GoodsItem(good);
            listHtml       += goodItem.render();
        });

        document.querySelector('.goods-list').innerHTML = listHtml;
    }        

    to_sum_prices() 
    {
        let sum_prices = this.goods.reduce((a, b) => a + b.price, 0);

        return sum_prices;
    }

    /**
     * При нажатии кнопки 'В корзину' добавляется в список корзины 1 позиция товара, выводится список в консоль.
     */
    add_to_basket() 
    {
        const btn = document.getElementsByClassName('btn_inBasket');

        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener('click', () => {
                console.log("Clicked index: " + i); 

                basket_.add(this.goods[i]);
                basket_.get_list_basket();                   
            });
        }
    }
}


class Elem_basket 
{
    constructor({ id_product, product_name, price, count }) 
    {
        this.id    = id_product;
        this.name  = product_name;
        this.price = price;
        this.count = count;
    }

    /**
     * Создает разметку одной строки позиции товара в корзине.
     */
    render() 
    {
        return `
            <div class="basket-item">
                <div>${this.id}</div>
                <div>${this.name}</div>
                <div>${this.price}</div>
                <div>${this.count}</div>
                <button>Delete</button>
            </div>
        `;
    }
}


class Basket 
{
    constructor() 
    {
        this.list_basket = [];
    }

    /**
     * Добавляет позицию товара в список корзины при нажатии соответствующей кнопки в карточке товара.
     * Если позиция товара существует в списке => увеличивается count.
     */
    add({ id_product, product_name, price })
    {
        let finded = false;

        for (let i = 0; i < this.list_basket.length; i++) {
            if (this.list_basket[i].id == id_product) {                    
                this.list_basket[i].count += 1;
                finded                     = true;
            } 
        }

        if (!finded) {
            this.list_basket.push({ id: id_product, name: product_name, price: price, count: 1 }); 
        }        
    }
    
    /**
     * Удаляет позицию товара из корзины при нажатии соответствующей кнопки.
     * Если добавлено несколько позиций, то сначала уменьшается count товара.
     */
    remove_item({ id_product }) 
    {    
        this.list_basket.forEach((elem) => {
            if (elem.id === id_product && elem.count > 1) {
                elem.count -=1;

                console.log('-1 count');
            } else if (elem.id === id_product && elem.count == 1) {
                this.list_basket.splice(elem, 1);

                console.log('delete');
            }
        })
        
        return this.list_basket;
    }

    get_list_basket()
    {
        return console.log(this.list_basket);
    }

    /**
     * Создает структуру корзины.
     */
    create_div(parent=document.main) 
    {
        let div         = document.createElement('div');        
        div.className   = 'basket';
        let div_title   = this.create_title();
        let elem_basket = new Elem_basket(); // ?
        let div_item    = elem_basket.render();
        let div_footer  = this.create_footer();

        parent.appendChild(div);
        div.appendChild(div_title);
        div.appendChild(div_item);
        div.insertAdjacentHTML('afterEnd', div_footer);
    }

    /**
     * Создает разметку заголовка корзины.
     */
    create_title() 
    {
        return `
        <div class="basket-title">
            <div>Id</div>
            <div>Name</div>
            <div>Price</div>
            <div>Amount</div>
        </div>
        `;
    }

    /**
     * Создает разметку футера корзины.
     */
    create_footer() 
    {
        return `
        <div class="basket-footer">
            <div class='foot-left'>Sum total</div>
            <div class='foot-right'>${this.price}</div>
        </div>
        `;
    }

    /**
     * Увеличение количества позиций товара в корзине.
     */
    increase_quantity() 
    {

    }

    /**
     * Удаляет корзину, если она пустая.
     */
    remove_basket() 
    {

    }

    /**
     * Суммирует общую стоимость позиций в корзине.
     */
    sum_prices() 
    {

    }
}


const list    = new GoodsList();
const basket_ = new Basket();

list.fetchGoods().then( 
    resolve => {
        list.goods = JSON.parse(resolve);
    
        list.render();
        list.add_to_basket();
    }
)
