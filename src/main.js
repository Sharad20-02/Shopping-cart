let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = ()=>{
    return shop.innerHTML = shopItemsData.map((x)=>{
        let {id, name, price, desc, img} = x;
        let search = basket.find((x)=>{
            return x.id == id;
        }) || [];
        return `
        <div id=product-id-${id} class="item">
                <img width="220" src=${img} alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${search.item === undefined ? 0:search.item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join("");
};

generateShop();

let increment = (item)=>{
    let {id} = item;
    let search = basket.find((x)=>{
        return x.id === id;
    });

    if(search === undefined || search === null){
        basket.push({
            id:id,
            item:1
        })
    }else{
        search.item += 1;
    }
    update(id);
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
    localStorage.setItem("data", JSON.stringify(basket));
};

let calculation = ()=>{
    let sum = basket.reduce((total,x)=>{
        return total += x.item;
    }, 0);
    document.getElementById('cart_Amount').innerHTML = sum;
};

let update = (id)=>{
    let search = basket.find((x)=>{
        return x.id == id;
    });
    document.getElementById(id).innerHTML = search.item;
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
};

calculation();