import type { Ref } from 'vue'
import type { EChartsOption } from 'echarts'
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'
import * as echarts from 'echarts/core'

export enum RenderType {
  SVGRenderer = 'SVGRenderer',
  CanvasRenderer = 'CanvasRenderer',
}
export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
  Default = 'default',
}
export interface AnimationType {
  enable?: boolean
  styles?: {
    [attr: string]: string
  }
}

export interface UseChartConfigType {
  autoChartSize?: boolean
  animation?: AnimationType | boolean
  render?: RenderType
  theme?: ThemeType
  components?: any[]
  charts?: any[]
}
export const useChart = (
  elRef: Ref<HTMLDivElement>,
  config = {
    autoChartSize: true,
    animation: false,
    render: RenderType.CanvasRenderer,
    theme: ThemeType.Default,
    components: [],
    charts: [],
  } as UseChartConfigType
) => {
  // 初始化echarts的基础配置，不包含具体的组件和图表类型
  const initEChartsBase = ({
    render = RenderType.CanvasRenderer,
    components = [],
    charts = [],
  }: UseChartConfigType) => {
    const renderer = render === 'SVGRenderer' ? SVGRenderer : CanvasRenderer
    echarts.use([renderer, ...components, ...charts])
  }

  let chartInstance: echarts.ECharts | null = null

  const initCharts = () => {
    const el = unref(elRef)

    if (!el || !unref(el)) {
      return
    }

    initEChartsBase({
      render: config.render,
      components: config.components,
      charts: config.charts,
    })
    chartInstance = echarts.init(el, config.theme)
  }

  const setOption = (option: EChartsOption) => {
    nextTick(() => {
      if (!chartInstance) {
        initCharts()
        if (!chartInstance) return
      }

      chartInstance.clear()
      chartInstance.setOption(option)
      hideLoading()
    })
  }

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts()
    }
    return chartInstance
  }

  function resize() {
    chartInstance?.resize()
  }

  function watchEl() {
    if (config.animation) {
      elRef.value.style.transition = 'width 1s, height 1s'
    }
    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(elRef.value)
  }

  function showLoading({ loadingColor } = { loadingColor: '#28cbad' }) {
    if (!chartInstance) {
      initCharts()
    }
    chartInstance?.showLoading({
      text: 'loading...',
      color: loadingColor,
      maskColor: 'rgba(255, 255, 255, 0.1)',
      zlevel: 0,
    })
  }
  // 显示加载状
  function hideLoading() {
    if (!chartInstance) {
      initCharts()
    }
    chartInstance?.hideLoading()
  }

  function clearChart() {
    chartInstance?.clear()
  }

  onMounted(() => {
    window.addEventListener('resize', resize, { passive: true })
    if (config.autoChartSize) watchEl()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resize)
    clearChart()
  })

  return {
    setOption,
    getInstance,
    showLoading,
    hideLoading,
    clearChart,
  }
}
