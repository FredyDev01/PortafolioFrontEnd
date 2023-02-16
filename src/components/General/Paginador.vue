<template>
    <div class="table mx-auto" v-show="ListPaginas.length && !Cargando">
        <ul class="flex justify-center text-gray-700 dark:text-white font-Maven text-xs">                                            
            <li class="flex items-stretch">
                <label for="PageFirst" class="px-3 py-2 mx-1 bg-gray-100 dark:bg-Prt260 transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md inline-flex items-center cursor-pointer text-indigo-500 dark:text-emerald-600">
                    <i class="fas fa-angle-double-left table-cell align-middle text-xxs"></i>
                </label>
                <input @click="ClickPage(1)" type="radio" id="PageFirst" class="hidden">
            </li>                                    
            <li v-for="Pag in ListPaginas" :key="Pag" class="flex items-stretch">
                <label :for="'Pag'+Pag" class="px-3 py-2 mx-1 border-2 rounded-md inline-flex items-center cursor-pointer" :class="[Pag == PageAct ? 'bg-indigo-500 dark:bg-emerald-600 border-indigo-500 dark:border-emerald-600 text-white' : 'bg-gray-100 dark:bg-Prt260 transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600']">{{Pag}}</label>
                <input @click="ClickPage(Pag)" type="radio" :id="'Pag'+Pag" class="hidden">
            </li>               
            <li class="flex items-stretch">
                <label for="FnlPage" class="px-3 py-2 mx-1 bg-gray-100 dark:bg-Prt260 transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md inline-flex items-center cursor-pointer text-indigo-500 dark:text-emerald-600">
                    <i class="fas fa-angle-double-right table-cell align-middle text-xxs"></i>
                </label>
                <input @click="ClickPage(Maxpage)" type="radio" id="FnlPage" class="hidden">
            </li>
        </ul>
    </div>    
</template>


<script>
export default {    
    data(){
        return{PageAct: 1, ListPaginas: []}
    },
    props: {Maxpage: Number, Cargando: Boolean},        
    emits: ['ChangePag'],
    watch: {Maxpage: {handler(){this.ListPage()}}},        
    methods: {
        ClickPage(Page){
            this.PageAct = Page
            this.$emit('ChangePag', this.PageAct)
        },
        ListPage(){                         
            if(this.Maxpage > 0){
                if(this.Maxpage < this.PageAct) this.PageAct = this.Maxpage
                if(this.PageAct < 0) this.PageAct = 1
                var ListFinal = [this.PageAct]
                var pgAntes = this.PageAct
                var pgDespues = this.PageAct
                do{
                    pgAntes--
                    pgDespues++
                    if(pgAntes > 0) ListFinal.push(pgAntes)
                    if(pgDespues <= this.Maxpage) ListFinal.push(pgDespues)
                }while((this.Maxpage >= 3 ? 3 : this.Maxpage) > ListFinal.length)
                ListFinal.sort()               
                this.ListPaginas = ListFinal
            }else this.ListPaginas = []
        }
    },
    mounted(){this.ListPage()}
}
</script>