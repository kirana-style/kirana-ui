"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import useEmblaCarousel from "embla-carousel-react"
import type { UseEmblaCarouselType } from "embla-carousel-react"

import { Button } from "./button"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { carousel } from "../../../styles/carousel.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  sx,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> &
  CarouselProps & { sx?: Sx }) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  // Whether the arrows can move, read from Embla whenever it selects a slide or reinitialises.
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      if (!api) return () => {}
      api.on("reInit", onChange)
      api.on("select", onChange)
      return () => {
        api.off("reInit", onChange)
        api.off("select", onChange)
      }
    },
    [api]
  )
  const canScrollPrev = React.useSyncExternalStore(
    subscribe,
    () => api?.canScrollPrev() ?? false,
    () => false
  )
  const canScrollNext = React.useSyncExternalStore(
    subscribe,
    () => api?.canScrollNext() ?? false,
    () => false
  )

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
        sx={[carousel.root, sx]}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} sx={carousel.viewport} data-slot="carousel-content">
      <div
        {...props}
        sx={[
          orientation === "horizontal"
            ? carousel.content
            : carousel.contentVertical,
          sx,
        ]}
      />
    </div>
  )
}

function CarouselItem({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      {...props}
      sx={[
        orientation === "horizontal" ? carousel.item : carousel.itemVertical,
        sx,
      ]}
    />
  )
}

function CarouselPrevious({
  sx,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      sx={[
        orientation === "horizontal"
          ? carousel.previous
          : carousel.previousVertical,
        sx,
      ]}
      isDisabled={!canScrollPrev}
      onPress={scrollPrev}
      {...props}
    >
      <IconPlaceholder
        lucide="ChevronLeftIcon"
        tabler="IconChevronLeft"
        hugeicons="ArrowLeft01Icon"
        phosphor="CaretLeftIcon"
        remixicon="RiArrowLeftSLine"
        {...styleProps(carousel.flip)}
      />
      <span sx={visuallyHidden}>Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  sx,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      sx={[
        orientation === "horizontal" ? carousel.next : carousel.nextVertical,
        sx,
      ]}
      isDisabled={!canScrollNext}
      onPress={scrollNext}
      {...props}
    >
      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
        {...styleProps(carousel.flip)}
      />
      <span sx={visuallyHidden}>Next slide</span>
    </Button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
}
