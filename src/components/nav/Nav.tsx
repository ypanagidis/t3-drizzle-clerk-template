import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import React from "react";
import { cn } from "~/utils/utils";

export const Nav = () => {
  return (
    <div className="flex w-full items-center justify-center border-b-2 p-4 ">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Horizon 23</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                      <h1>YP</h1>
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Menu Name: Horizon 2023
                      </div>
                      <p>Venue: Horizon</p>
                      <div className="flex flex-col space-y-1">
                        <p>14 Signature Drinks</p>
                        <p>11 Classics</p>
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem title="Cocktails">
                  <p>All the menu cocktails </p>
                </ListItem>
                <ListItem title="Ingredients">
                  <p>All the menu ingredients</p>
                </ListItem>
                <ListItem title="Preps">
                  <p>Alio / 15 Signatures</p>
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
