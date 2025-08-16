import React from "react";
import { HeroUIProvider, Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Switch } from "@heroui/react";
import { BrowserRouter as Router, Route, Switch as RouterSwitch, Link } from "react-router-dom";
import { ProductList } from "./components/ProductList";
import { SupplierList } from "./components/SupplierList";
import { InventoryList } from "./components/InventoryList";
import { OrderList } from "./components/OrderList";
import { StoreFront } from "./components/StoreFront";
import { Dashboard } from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
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
          <RouterSwitch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/signup">
              <SignupPage />
            </Route>
            <Route>
              <Navbar isBordered maxWidth="xl">
                <NavbarBrand>
                  <Icon icon="lucide:shopping-bag" className="text-primary text-2xl mr-2" />
                  <p className="font-bold text-inherit">Retail Store Admin</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                  <NavbarItem>
                    <Link to="/" className="text-foreground">
                      Dashboard
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link to="/products" className="text-foreground">
                      Products
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link to="/suppliers" className="text-foreground">
                      Suppliers
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link to="/inventory" className="text-foreground">
                      Inventory
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link to="/orders" className="text-foreground">
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
                    <Link to="/login" className="text-primary">
                      Login
                    </Link>
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
            </Route>
          </RouterSwitch>
        </div>
      </Router>
    </HeroUIProvider>
  );
};

export default App;