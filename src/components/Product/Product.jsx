import React, { useEffect, useState } from "react";
const API_URL = "http://localhost:3000/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button, List } from "@mui/material";

const Product = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(null);
  const [openn, setOpenn] = useState(false);
  const [seatch , setSearch] = useState('')
  const [priceValue , setPriceValue] = useState(0)
  const [select , setSelect] = useState('')

  const handleClickk = () => {
    setOpenn(true);
    let arrproducts = [];
    localStorage.setItem("arrproducts", JSON.stringify(arrproducts));
    forCart();
    sumPrice(0);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenn(false);
  };

  async function get() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    get();
  }, []);

  function sumPrice(sum) {
    let total = 0;
    if (sum == 0) {
      setPrice("$0");
      setCount(0);
    } else {
      sum.forEach((product) => {
        let number = parseFloat(product.price.replaceAll("$", ""));
        total += number * product.quantity;
      });
      setPrice(`$${total}`);
    }
  }

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("arrproducts")) || [];
    setCount(stored.length);
  }, []);

  /////////  fun counter
  function funCount(ele) {
    let data = JSON.parse(localStorage.getItem("arrproducts")) || [];
    let obj = data.find((value) => value.id == ele.id);
    if (obj) {
      console.log("true");
      data = data.map((e) => {
        if (e.id == obj.id) {
          e.quantity += 1;
        }
        return e;
      });
      // sumPrice(data)
      localStorage.setItem("arrproducts", JSON.stringify(data));
      console.log(data);
    } else {
      ele.quantity = 1;
      data.push(ele);
      setCount(data.length);
      // sumPrice(data)
    }
    console.log(data);
    localStorage.setItem("arrproducts", JSON.stringify(data));
    setCount(data.length);
  }

  /// dark mode
  function handleClick() {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }
  }

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  function forCart() {
    let data = JSON.parse(localStorage.getItem("arrproducts"));
    sumPrice(data);
    setCart(data);
    console.log(cart);
    console.log(data);
  }

  function funDel(e) {
    let data = JSON.parse(localStorage.getItem("arrproducts"));
    let Delete = data.filter((ele) => ele.id != e.id);
    sumPrice(Delete);
    localStorage.setItem("arrproducts", JSON.stringify(Delete));
    setCount(Delete.length);
    forCart();
  }
  function funPlus(e) {
    let data = JSON.parse(localStorage.getItem("arrproducts"));
    let getDataPlus = data.map((ele) => {
      if (ele.id === e.id) {
        ele.quantity += 1;
      }
      return ele;
    });
    sumPrice(getDataPlus);

    localStorage.setItem("arrproducts", JSON.stringify(getDataPlus));
    forCart();
  }
  function funMin(e) {
    let data = JSON.parse(localStorage.getItem("arrproducts"));
    let getDataMin = data.filter((ele) => {
      if (ele.id === e.id) {
        ele.quantity -= 1;
        return ele.quantity > 0;
      }
      return true;
    });
    localStorage.setItem("arrproducts", JSON.stringify(getDataMin));
    sumPrice(getDataMin);
    setCount(getDataMin.length);
    forCart();
  }
  //////////////// carsina
  const DrawerList = (
    <Box
      sx={{
        width: 320,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        height: "100%",
        justifyContent: "space-between",
      }}
      role="presentation"
      className="px-7 py-7"
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <button onClick={toggleDrawer(false)} className="text-3xl">
            ❌
          </button>
        </div>
        {cart.map((e) => {
          return (
            <div key={e.id} className="flex gap-2">
              <img
                className="w-[40%] rounded-2xl h-[100px]"
                src={e.img[0]}
                alt=""
              />
              <aside className="w-[60%] flex flex-col gap-1">
                <div className="flex justify-between w-[100%]">
                  <h3 className="text-[18px]">{e.name}</h3>
                  <button onClick={() => funDel(e)}>❌</button>
                </div>
                <h3 className="text-[18px] font-bold">{e.price}</h3>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => funPlus(e)}
                    className="border-2 px-2 rounded-[5px] font-bold text-[#BA5D2C] border-[#BA5D2C]"
                  >
                    +
                  </button>
                  <h3 className="font-sans font-bold">{e.quantity}</h3>
                  <button
                    onClick={() => funMin(e)}
                    className="border-2 px-2 rounded-[5px] font-bold text-[#BA5D2C] border-[#BA5D2C]"
                  >
                    -
                  </button>
                </div>
              </aside>
            </div>
          );
        })}
      </div>
      <div>
        <div className="flex w-[100%] justify-between my-3">
          <h3 className="font-serif font-bold text-2xl">Total:</h3>
          <yh3 className="font-sans font-bold text-2xl">{price}</yh3>
        </div>
        <button
          onClick={handleClickk}
          className="bg-[#BA5D2C] text-2xl w-[100%] font-bold py-2 text-white rounded-[5px]"
        >
          CHECKOUT
        </button>
      </div>
      <Snackbar
        open={openn}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Your Product Successfully Accept!
        </Alert>
      </Snackbar>
    </Box>
  );

  useEffect(() => {
    handleClick();
  }, []);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const filter = data.filter((e)=> {
    let answer = {}
    if(seatch){
        answer = seatch.toUpperCase().includes(e.name.toUpperCase())
    }
    // if(select != 'all'){
      //     answer = select == "IKEA"
      // }
      if(priceValue){
        answer = parseFloat(e.price.replaceAll("$", "")) <= priceValue;
      }
      return answer
    })
  console.log(filter);

  const [opan, setOpan] = React.useState(false);
  const toggleDrawerr = (newOpen) => () => {
    setOpan(newOpen);
  };

  const DrawerListt = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawerr(false)}>
      <ul className="gap-5 text-2xl text-black w-[440px] px-5 flex flex-col">
        <List>
          Menu
        </List>
            <Link to="/">
              <li>🏠{t("home")}</li>
            </Link>
            <Link to="/Product">
              <li>🛍️{t("product")}</li>
            </Link>
            <Link to="/About">
              <li>⭐{t("about")}</li>
            </Link>
          </ul>
    </Box>
  );


  return (
    <div className="dark:bg-gray-900">
      <header className="max-w-[1910px] m-auto">
              <Drawer open={opan} onClose={toggleDrawerr(false)}>
                {DrawerListt}
              </Drawer>
              <Drawer open={opan} onClose={toggleDrawerr(false)}>
                {DrawerListt}
              </Drawer>
        <nav className=" max-w-[1600px] m-auto flex justify-between relative py-5">
        <div className="md:hidden block">
      <Button onClick={toggleDrawerr(true)}>=</Button>
          </div>
          <ul className="gap-12 text-2xl     hidden md:flex w-[440px dark:text-white">
            <Link to="/">
              <li>{t("home")}</li>
            </Link>
            <Link to="/Product">
              <li>{t("product")}</li>
            </Link>
            <Link to="/About">
              <li>{t("about")}</li>
            </Link>
          </ul>
          <h2 className="nameCom dark:text-white">{t("AccessMS")}</h2>
          <div className="flex items-center gap-3">
            {/* ///////////////////////////// carsin btn */}
            <button
              onClick={handleClick}
              className="dark:bg-amber-500 bg-black py-1 px-2 text-white rounded-2xl"
            >
              Dark
            </button>
            {/* ////////////////////// for language */}
            <select
              className="text-white bg-black py-1 text-[15px] px-2 dark:bg-amber-500 rounded-2xl"
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="tj">TJ</option>
            </select>

            <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
              <StyledBadge
                onClick={() => forCart()}
                badgeContent={count}
                color="secondary"
              >
                <ShoppingCartIcon
                  sx={{ fontSize: "40px" }}
                  className=" dark:text-white"
                />
              </StyledBadge>
            </IconButton>
          </div>
          {/* //////////////////// for carsina */}
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </nav>
      </header>
        {/* //////////////////// for the  */}
      <section className="max-w-[1920px] md:h-[300px] h-[100px] dark:bg-blue-950  bg-[#F1F5F8] m-auto">
            <div className="maw-w-[1600px] md:ml-[150px] m-auto md:h-[300px] h-[100px] flex items-center">
              <h2 className="md:text-4xl text-2xl md:px-0 px-5 dark:text-white text-[#235275]">
                {t("home")} / {t("product")}
              </h2>
            </div>
      </section>
      <section className="max-w-[1600px] m-auto flex md:flex-row flex-col gap-5 py-10">
        <aside className="md:w-[20%] flex flex-col items-start gap-5 px-5">
            {/* /////////////////// aside */}
          <input type="text" placeholder="Search" value={seatch} onChange={(e)=> setSearch(e.target.value)} className="bg-[#F1F5F8] dark:text-white dark:bg-blue-950 py-1.5 rounded-[10px] px-5" />
          <div>
          <p className="font-bold dark:text-white">Company</p>
          <select className="border-1 py-2 px-2 rounded-2xl dark:text-white dark:bg-gray-900 my-2" value={select} onChange={(e)=> setSelect(e.target.value)}>
            <option value="all">All</option>
            <option value="IKEA">Ikea</option>
            <option value="MARCOS">Marcos</option>
            <option value="CARESSA">Caressa</option>
            <option value="LIDDY">Liddy</option>
          </select>
          </div>
          <div>
          <p className="font-bold dark:text-white">Price</p>
          <input className="" type="range" value={priceValue} onChange={(e)=> setPriceValue(e.target.value)}/>
          <p className="font-bold dark:text-white">{`Value : $${priceValue}`}</p>
          </div>
        </aside>
        <div className="md:w-[80%] flex flex-wrap gap-6">
          {filter.map((e) => {
            return (
              <div key={e.id} className="md:w-[32%] w-[90%] m-auto h-[250px]">
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper rounded-3xl"
                >
                  {e.img.map((el , idx) => {
                    return (
                      <SwiperSlide
                        key={idx}
                        className="flex flex-col items-center relative group"
                      >
                        <div className="w-[100%] h-[100%] relative overflow-hidden">
                          <img
                            src={el}
                            className="w-full h-[300px] object-contain"
                          />
                          {/* ////////////////// hover btn */}
                          <div className="absolute inset-0 bg-[#1a1a1ace] bg-opacity-40 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={() => funCount(e)}
                              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                              🛒
                            </button>
                            <Link to={`/product/${e.id}`}>
                              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                👁️
                              </button>
                            </Link>
                          </div>
                        </div>
                        <div className="rounded-2xl text-center mt-0 py-0 flex items-center gap-3 pb-5">
                          <h2 className="text-[20px] font-bold text-amber-600">
                            {t(`${e.name}`)}
                          </h2>
                          <p className="text-[14px] font-bold text-blue-900">
                            {e.price}
                          </p>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Product;
