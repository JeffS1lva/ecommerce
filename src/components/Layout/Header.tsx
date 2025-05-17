"use client"

import React, { useState, useEffect } from 'react'
import { useCart } from '@/Context/CartContext'
import { categories } from '../../data/categories'
import MobileMenu from '@/components/Layout/MobileMenu'
import Cart from '@/components/Cart/Cart'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation' // Importar useRouter do Next.js

import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronRight,
  User,
  Bell,
  Sparkles,
  ChevronDown,
  LogOut,
  Package,
  Settings,
  Bookmark
} from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

// Types
type SubItem = string;

interface Item {
  name: string;
  subItems: SubItem[];
}

interface CategorySection {
  name: string;
  items: Item[];
}

interface CategoryContent {
  featured: string[];
  categories: CategorySection[];
  popularTags?: string[];
  promotions?: {
    title: string;
    description: string;
    cta: string;
    image: string;
  }[];
}

interface CategoryContentMap {
  [key: string]: CategoryContent;
}

// Expanded data with submenus for specific items
const categoryContent: CategoryContentMap = {
  "Feminino": {
    featured: ["Nova Coleção Verão", "Essenciais Minimalistas", "Edição Limitada"],
    categories: [
      { 
        name: "Roupas", 
        items: [
          { 
            name: "Vestidos", 
            subItems: ["Vestidos Longos", "Vestidos Curtos", "Vestidos de Festa", "Vestidos Casuais"] 
          },
          { 
            name: "Blusas", 
            subItems: ["Blusas de Seda", "T-shirts", "Regatas", "Croppeds", "Camisas"] 
          },
          { 
            name: "Calças", 
            subItems: ["Calças Sociais", "Leggings", "Pantalonas", "Calças Jeans"] 
          },
          { 
            name: "Jeans", 
            subItems: ["Skinny", "Mom", "Wide Leg", "Boyfriend"] 
          },
          { 
            name: "Saias", 
            subItems: ["Mini Saias", "Midi", "Longas", "Plissadas"] 
          }
        ] 
      },
      { 
        name: "Acessórios", 
        items: [
          { 
            name: "Bolsas", 
            subItems: ["Bolsas de Mão", "Clutches", "Mochilas", "Bolsas Transversais"] 
          },
          { 
            name: "Sapatos", 
            subItems: ["Tênis", "Sandálias", "Sapatilhas", "Salto Alto"] 
          },
          { 
            name: "Joias", 
            subItems: ["Brincos", "Colares", "Pulseiras", "Anéis"] 
          },
          { 
            name: "Cintos", 
            subItems: ["Cintos Slim", "Cintos Largos", "Cintos Decorativos"] 
          }
        ] 
      },
      { 
        name: "Coleções", 
        items: [
          { 
            name: "Casual", 
            subItems: ["Primavera", "Verão", "Outono", "Inverno"] 
          },
          { 
            name: "Formal", 
            subItems: ["Trabalho", "Eventos", "Cerimônias"] 
          },
          { 
            name: "Resort", 
            subItems: ["Praia", "Férias", "Tropical"] 
          },
          { 
            name: "Athleisure", 
            subItems: ["Esportes", "Fitness", "Loungewear"] 
          }
        ] 
      }
    ],
    popularTags: ["Sustentável", "Premium", "Básicos", "Em Promoção", "Nova Coleção"],
    promotions: [
      {
        title: "Coleção Resort 2025",
        description: "Peças exclusivas para suas férias",
        cta: "Explorar",
        image: "resort"
      }
    ]
  },
  "Masculino": {
    featured: ["Nova Coleção Inverno", "Básicos Premium", "Streetwear"],
    categories: [
      { 
        name: "Roupas", 
        items: [
          { 
            name: "Camisas", 
            subItems: ["Camisas Sociais", "Camisas Casuais", "Camisas Estampadas", "Camisas Jeans"] 
          },
          { 
            name: "Camisetas", 
            subItems: ["Básicas", "Gráficas", "Polos", "Manga Longa"] 
          },
          { 
            name: "Calças", 
            subItems: ["Calças Sociais", "Calças Chino", "Moletom", "Joggers"] 
          },
          { 
            name: "Jeans", 
            subItems: ["Slim", "Regular", "Relaxed", "Straight"] 
          },
          { 
            name: "Blazers", 
            subItems: ["Slim Fit", "Regular", "Casual", "Cerimônia"] 
          }
        ] 
      },
      { 
        name: "Acessórios", 
        items: [
          { 
            name: "Relógios", 
            subItems: ["Analógicos", "Digitais", "Smartwatches", "Esportivos"] 
          },
          { 
            name: "Sapatos", 
            subItems: ["Tênis", "Botas", "Sapatos Sociais", "Mocassins"] 
          },
          { 
            name: "Cintos", 
            subItems: ["Couro", "Casual", "Social", "Esportivo"] 
          },
          { 
            name: "Mochilas", 
            subItems: ["Casuais", "Executivas", "Esportivas", "Viagem"] 
          }
        ] 
      },
      { 
        name: "Coleções", 
        items: [
          { 
            name: "Casual", 
            subItems: ["Primavera", "Verão", "Outono", "Inverno"] 
          },
          { 
            name: "Business", 
            subItems: ["Formal", "Smart Casual", "Executivo"] 
          },
          { 
            name: "Esportiva", 
            subItems: ["Treino", "Corrida", "Golf", "Casual"] 
          },
          { 
            name: "Urban", 
            subItems: ["Streetwear", "Contemporâneo", "Urbano Casual"] 
          }
        ] 
      }
    ],
    popularTags: ["Urbano", "Casual", "Clássico", "Esportivo", "Promocional"],
    promotions: [
      {
        title: "Coleção Urban Tech",
        description: "Estilo e funcionalidade para o dia a dia",
        cta: "Ver coleção",
        image: "urban"
      }
    ]
  }
}

// Motion variants
const logoVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
}

const searchVariants = {
  hidden: { opacity: 0, width: "0%" },
  visible: {
    opacity: 1,
    width: "100%",
    transition: { type: "tween", duration: 0.3 }
  },
  exit: {
    opacity: 0,
    width: "0%",
    transition: { duration: 0.2 }
  }
}

const iconButtonVariants = {
  hover: {
    scale: 1.1,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  tap: { scale: 0.95 }
}

const tagVariants = {
  initial: { opacity: 0, y: 10 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.4
    }
  }),
  hover: {
    y: -2,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
}

// Sub-components
interface MenuItemWithSubmenuProps {
  item: Item;
}

const MenuItemWithSubmenu: React.FC<MenuItemWithSubmenuProps> = ({ item }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center justify-between w-full rounded-md p-2 text-sm leading-none transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer group">
          <span className="group-hover:text-indigo-600">{item.name}</span>
          <ChevronRight size={14} className="ml-2 opacity-70 group-hover:text-indigo-600" />
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-56 p-2">
        <ul className="space-y-1">
          {item.subItems.map(subItem => (
            <li key={subItem}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start"
                asChild
              >
                <a href="#">{subItem}</a>
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

interface CategoryMegaMenuProps {
  category: string;
}

const CategoryMegaMenu: React.FC<CategoryMegaMenuProps> = ({ category }) => {
  // Use category data if it exists, or fallback to simple structure
  const content = categoryContent[category]

  if (!content) {
    return (
      <div className="w-[200px] p-4">
        <ul className="grid gap-2">
          {["Todos os produtos", "Novidades", "Mais vendidos", "Ofertas"].map((subcategory) => (
            <li key={`${category}-${subcategory}`}>
              <NavigationMenuLink asChild>
                <a
                  href="#"
                  className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {subcategory}
                </a>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Featured Section */}
        <div className="col-span-3">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Em Destaque</div>
          <ul className="space-y-4">
            {content.featured.map((item, index) => (
              <motion.li 
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <a
                  href="#"
                  className="group flex flex-col gap-2 rounded-lg p-3 transition-colors hover:bg-muted"
                >
                  <div className="h-24 w-full overflow-hidden rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                    <Sparkles className="h-8 w-8 opacity-90" />
                  </div>
                  <div className="font-medium text-sm group-hover:text-indigo-600 transition-colors">
                    {item}
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Categories Section */}
        <div className="col-span-6">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Categorias</div>
          <div className="grid grid-cols-3 gap-6">
            {content.categories.map(section => (
              <div key={section.name}>
                <div className="font-medium text-sm mb-2">{section.name}</div>
                <ul className="space-y-1">
                  {section.items.map(item => (
                    <li key={item.name} className="text-muted-foreground">
                      <MenuItemWithSubmenu item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Tags & Promo */}
        <div className="col-span-3">
          {content.popularTags && (
            <div className="mb-6">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Tags Populares</div>
              <div className="flex flex-wrap gap-2">
                {content.popularTags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    custom={index}
                    variants={tagVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    <Badge 
                      variant="outline" 
                      className="hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors border-indigo-200 px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {content.promotions && content.promotions.length > 0 && (
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Promoções</div>
              {content.promotions.map((promo, index) => (
                <Card key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 border-none overflow-hidden">
                  <CardContent className="p-4">
                    <div className="font-medium mb-1 text-indigo-700">{promo.title}</div>
                    <p className="text-xs text-muted-foreground mb-3">{promo.description}</p>
                    <Button variant="default" size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      {promo.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [searchVisible, setSearchVisible] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { cartItems, isCartOpen, setIsCartOpen, getTotalItems } = useCart()
  const totalItems = getTotalItems()

  


  // Detect scroll for visualization effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Promo banner */}
      

      {/* Main Header */}
      <motion.header
        className={cn(
          "sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300",
          isScrolled
            ? 'bg-white/95 border-b shadow-sm'
            : 'bg-white'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto">
          {/* Header Top */}
          <div className="flex items-center justify-between h-16 lg:h-20 px-4">
            {/* Mobile menu and logo */}
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <motion.div
                    variants={iconButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button variant="ghost" size="icon" className="lg:hidden">
                      <Menu size={22} />
                    </Button>
                  </motion.div>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <MobileMenu />
                </SheetContent>
              </Sheet>

              <motion.div
                className="relative flex items-center"
                variants={logoVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <span className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  MODACHIC
                </span>
                <motion.span
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                />
              </motion.div>
            </div>

            {/* Expandable search bar */}
            <AnimatePresence mode="wait">
              {!searchVisible ? (
                <motion.div
                  className="hidden md:flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="nav-items"
                >
                  <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList>
                      {categories.map((category) => (
                        <NavigationMenuItem key={category}>
                          <NavigationMenuTrigger className="text-sm font-medium">
                            {category}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <CategoryMegaMenu category={category} />
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      ))}
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-sm font-medium">
                          Coleções
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {[
                              {
                                title: "Inverno 2025",
                                description: "Nossa nova coleção para o inverno chegou.",
                                href: "#"
                              },
                              {
                                title: "Essenciais",
                                description: "Peças básicas e atemporais para o dia a dia.",
                                href: "#"
                              },
                              {
                                title: "Premium",
                                description: "Tecidos e materiais de alta qualidade.",
                                href: "#"
                              },
                              {
                                title: "Edição Limitada",
                                description: "Peças exclusivas por tempo limitado.",
                                href: "#"
                              }
                            ].map((item) => (
                              <li key={item.title}>
                                <NavigationMenuLink asChild>
                                  <a
                                    href={item.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">{item.title}</div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                      {item.description}
                                    </p>
                                  </a>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <Button variant="link" className="text-sm font-medium h-auto" asChild>
                          <NavigationMenuLink href="#">Outlet</NavigationMenuLink>
                        </Button>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </motion.div>
              ) : (
                <motion.div
                  className="relative max-w-xl w-full mx-4"
                  variants={searchVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="search-expanded"
                >
                  <Input
                    type="text"
                    placeholder="O que você está procurando hoje?"
                    className="pr-10 border-gray-300 focus-visible:ring-indigo-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => setSearchVisible(false)}
                  >
                    <X size={18} className="text-gray-500" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation icons */}
            <div className="flex items-center gap-1 md:gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      variants={iconButtonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className={searchVisible ? "hidden md:flex" : "flex"}
                        onClick={() => setSearchVisible(true)}
                      >
                        <Search size={20} />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Buscar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      variants={iconButtonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="hidden md:block"
                    >
                      <Button variant="ghost" size="icon">
                        <Bell size={20} />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notificações</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      variants={iconButtonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="hidden md:block"
                    >
                      <Button variant="ghost" size="icon">
                        <Heart size={20} />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Favoritos</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      variants={iconButtonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                      >
                        <ShoppingBag size={20} />
                        <AnimatePresence mode="wait">
                          {totalItems > 0 && (
                            <motion.div
                              key="badge"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 20 }}
                              className="absolute -top-1 -right-1"
                            >
                              <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 text-white px-1.5 min-w-5 h-5 flex items-center justify-center rounded-full text-xs">
                                {totalItems}
                              </Badge>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Carrinho</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    variants={iconButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="hidden md:block"
                  >
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                          MC
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                        MC
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Visitante</p>
                      <p className="text-xs leading-none text-muted-foreground">Faça login para continuar</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Meu Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Package className="mr-2 h-4 w-4" />
                      <span>Meus Pedidos</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bookmark className="mr-2 h-4 w-4" />
                      <span>Lista de Desejos</span>
                    </DropdownMenuItem>
                    
                    </DropdownMenuGroup>
                  <DropdownMenuItem>Entrar</DropdownMenuItem>
                  <DropdownMenuItem>Cadastrar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
            </div>
          </div>
        </div>
      </motion.header>

      {/* Carrinho */}
      <Cart />
    </>
  )
}

export default Header