let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = ()=>{
    let sum = basket.reduce((total,x)=>{
        return total += x.item;
    }, 0);
    document.getElementById('cart_Amount').innerHTML = sum;
};

calculation();

let TotalAmount = ()=>{
    if( basket.length !=0 ){
        let amount = basket.map((x)=>{
            let {item, id} = x;
            let search = shopItemsData.find((y)=>{ return y.id == id; }) || [];
            return item * search.price;
        });

    return amount.reduce((total,x)=>{
        return total += x;
    },0);
    }else{
        return;
    }
};

let generateCartItems = ()=>{
    if(basket.length != 0){
        shoppingCart.innerHTML = basket.map((x)=>{
            let {id, item} = x;
            let search = shopItemsData.find((y)=>{return y.id == id;}) || [];
            return `
            <div class="cart-item">
                <img width="100" src=${search.img} alt="">
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>
                    <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h3>$ ${search.price * item}</h3>
                </div>
            </div>`
        }).join("");

        let price = TotalAmount();

        label.innerHTML = `
        <div>
            <h2>Total bill : $ ${price}</h2>
        </div>
        <div>
            <a href="index.html">
            <button class="homeButton" style="background-color:green;">Checkout</button>
            </a>
            <button onclick="removeItems()" class="homeButton" style="background-color:red;">Clear Cart</button>
        </div>`;
    }else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
            <button class="homeButton">Back to home</button>
        </a>`

    }
};

generateCartItems();

let increment = (item)=>{
    let {id} = item;
    let search = basket.find((x)=>{
        return x.id === id;
    });

    if(search === undefined){
        basket.push({
            id:id,
            item:1
        })
    }else{
        search.item += 1;
    }
    update(id);
    generateCartItems();
};

let decrement = (item)=>{
    let {id} = item;
    let search = basket.find((x)=>{
        return x.id === id;
    });
    if(search === undefined){
        return;
    }
    else if(search.item === 0){
        return;
    }else{
        search.item -= 1;
    }
    update(id);

    basket = basket.filter((x)=>{
        return x.item !== 0;
    });
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id)=>{
    let search = basket.find((x)=>{
        return x.id === id;
    });
    document.getElementById(id).innerHTML = search.item;
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
};

let removeItem = (item)=>{
    let {id} = item;
    basket = basket.filter((x)=>{
        return x.id != id;
    });
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    calculation();
};

let removeItems = ()=>{
    basket.map((x)=>{
        removeItem(x);
    })
}