<template>
    <div class="w-full d-flex flex-col justify-center items-center">
        <main class="loader2 bg-gray-300 dark:bg-gray-600 mx-auto bg"></main>
        <main class="Sombra mt-2 mx-auto bg-Prt290 dark:bg-Prt320"></main>
        <h1 class="text-center mt-5 font-bold text-2xl font-Poppins text-Prt80 dark:text-gray-600">{{tltLoader}}</h1>
    </div>    
</template>


<script>
export default{
    props: ['tltLoader'],
    name: 'LoadingData'
}
</script>


<style scoped>
    .loader2{
        width: 60px;
        height: 60px;
        animation: girar .35s linear infinite;
        position: relative;
        border-radius: 3px;
        z-index: 5;
    }    
    .Sombra{
        width: 60px;
        height: 10px;
        animation: sombra-animada .5s linear infinite; 
        position: relative;
        border-radius: 50%;
    }    
    @keyframes girar{
        17%{
            border-bottom-right-radius: 3px;
        }
        25%{
            transform: translateY(9px) rotate(22.5deg);
        }
        50%{
            transform: scale(1, 0.9) translateY(18px) rotate(45deg);
            border-bottom-right-radius: 40px;
        }
        75%{
            transform: translateY(9px) rotate(67.5deg);
        }
        100%{
            transform: translateY(0) rotate(90deg);
        }
    }    
    @keyframes sombra-animada{
        50%{
            transform: scale(1.3, 1);
        }
    }
</style>
