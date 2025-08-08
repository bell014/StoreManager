import React from "react";
import { HeroUIProvider, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Switch } from "@heroui/react";
import { BrowserRouter as Router, Route, Switch as RouterSwitch } from "react-router-dom";
import { ProductList } from "./components/ProductList";
import { SupplierList } from "./components/SupplierList";
import { InventoryList } from "./components/InventoryList";
import { OrderList } from "./components/OrderList";
import { StoreFront } from "./components/StoreFront";
import { Dashboard } from "./components/Dashboard";
import { Icon } from "@iconify/react";
import { useTheme } from "@heroui/use-theme";

const App: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <HeroUIProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar isBordered maxWidth="xl">
            <NavbarBrand>
              <Icon icon="lucide:shopping-bag" className="text-primary text-2xl mr-2" />
              <p className="font-bold text-inherit">Retail Store Admin</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <Link color="foreground" href="/">
                  Dashboard
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/products">
                  Products
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/suppliers">
                  Suppliers
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/inventory">
                  Inventory
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/orders">
                  Orders
                </Link>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem>
                <div className="flex items-center">
                  <Icon icon="lucide:sun" className="mr-2" />
                  <Switch
                    checked={theme === "dark"}
                    onChange={toggleDarkMode}
                    size="sm"
                  />
                  <Icon icon="lucide:moon" className="ml-2" />
                </div>
              </NavbarItem>
              <NavbarItem>
                <Button color="primary" variant="flat">
                  Login
                </Button>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          <main className="container mx-auto px-4 py-8">
            <RouterSwitch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/products" component={ProductList} />
              <Route path="/suppliers" component={SupplierList} />
              <Route path="/inventory" component={InventoryList} />
              <Route path="/orders" component={OrderList} />
            </RouterSwitch>
          </main>
        </div>
      </Router>
    </HeroUIProvider>
  );
};

export default App;