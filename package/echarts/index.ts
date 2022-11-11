

import { echarts } from "./lib"

export const useEcharts = (
    htmlElement = null,
    theme: string,
    opt: Record<string, any>,
    dark = false
) => {
   if(!htmlElement) {
     throw 'not fount element in html'
   }

   let chartInstance: any = null;
   let darkMode = dark; 

   const render = () => {
    chartInstance = echarts.init(htmlElement, theme, opt);
    window.addEventListener('resize', resize)
   }


   const setOption = () => {

   }

   const resize = () => {
     getInstance().resize();
   }

   const toggleTheme = () => {

   }

   const getInstance = () => {
    if(!chartInstance) {
      render(); 
    }
    return chartInstance;
   }


   return {
     getInstance,
   }
}