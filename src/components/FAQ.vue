<template>
    <div class="m-4 rounded-[16px] bg-white pb-[64px]">
        <h2 class="pt-[64px] pb-[48px] text-center mont-medium text-[64px]">Часто задаваемые вопросы</h2>
        <div class="p-4 flex justify-center ">
            <div class="w-[80%] flex flex-col gap-2">
                <div
                    v-for="(item, index) in accordionItems"
                    :key="item.id"
                    class="overflow-hidden transition-all duration-300"
                >
                    <!-- Заголовок -->
                    <button
                        @click="toggleAccordion(index)"
                        class="w-full px-4 py-3 text-left flex items-center justify-between transition-colors duration-200 focus:outline-none"
                    >
                        <span class="mont-medium text-[28px] color-[#FF921C]">{{ item.title }}</span>
                        <svg
                            class="w-10 h-10 text-gray-500 transform transition-transform duration-300"
                            :class="{ 'rotate-180': item.isOpen }"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#FF921C"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
    
                    <!-- Контент -->
                    <div
                        class="transition-all duration-300 overflow-hidden"
                        :style="item.isOpen ? `max-height: ${item.contentHeight}px` : 'max-height: 0px'"
                        ref="contentElements"
                    >
                        <div class="p-4 mont-regular text-[18px]">
                            <slot v-if="item.slotName" :name="item.slotName"></slot>
                            <template v-else>{{ item.content }}</template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    items: {
        type: Array,
        default: () => [
            {
                id: 1,
                title: 'Какой чай лучше выбрать новичку?',
                content: 'Если вы только начинаете знакомство с чаем, рекомендуем начать с мягких и универсальных сортов: белый чай, зеленый чай (например, «Жасминовый») или легкие улуны («Те Гуань Инь»). Они обладают приятным вкусом без излишней терпкости. Также можно попробовать фруктовые или травяные смеси — они доступны и разнообразны.',
                isOpen: false,
            },
            {
                id: 2,
                title: 'В чем разница между пакетированным и листовым чаем?',
                content: 'Листовой чай сохраняет больше полезных веществ, эфирных масел и даёт насыщенный вкус. Пакетированный чай удобен, но часто содержит мелкую фракцию листа (пыль), что ухудшает качество напитка. Мы советуем выбирать листовой чай для полноценного чаепития.',
                isOpen: false,
            },
            {
                id: 3,
                title: 'Есть ли у вас чай без кофеина?',
                content: 'Да! В нашем ассортименте есть травяные и фруктовые чаи (например, ройбуш, каркаде, мята, иван-чай), которые не содержат кофеина. Также можно выбрать декофеинизированные версии черного или зеленого чая.',
                isOpen: false,
            },
            {
                id: 4,
                title: 'Как хранить чай, чтобы он не терял вкус?',
                content: 'Главные враги чая — свет, воздух, влага и посторонние запахи. Храните его в герметичной непрозрачной банке или фольгированном пакете в сухом прохладном месте (не в холодильнике!). Срок хранения зависит от сорта: зеленый и белый чай — до 1 года, улуны и пуэры — могут храниться годами.',
                isOpen: false,
            },
            {
                id: 5,
                title: 'Можно ли заказывать чай в подарок?',
                content: 'Конечно! У нас есть подарочные наборы с разными сортами чая, красивые жестяные банки и сертификаты. Вы можете оставить пожелание в комментарии к заказу, и мы красиво упакуем ваш подарок.',
                isOpen: false,
            },
            {
                id: 6,
                title: 'Какой срок доставки?',
                content: '*Доставка по России занимает 2–7 дней в зависимости от региона. В Москве и СПб возможен самовывоз или экспресс-доставка в день заказа. Точные сроки и стоимость рассчитываются при оформлении.*',
                isOpen: false,
            },
        ],
    },
    multiple: {
        type: Boolean,
        default: false,
    },
})

const accordionItems = ref(
    props.items.map((item) => ({
        ...item,
        contentHeight: 0,
    }))
)

const contentElements = ref([])

const toggleAccordion = (index) => {
    if (!props.multiple) {
        // Закрываем все элементы, если не разрешено множественное открытие
        accordionItems.value.forEach((item, i) => {
            if (i !== index) item.isOpen = false
        })
    }

    accordionItems.value[index].isOpen = !accordionItems.value[index].isOpen

    // Обновляем высоту контента
    if (accordionItems.value[index].isOpen && contentElements.value[index]) {
        accordionItems.value[index].contentHeight = contentElements.value[index].scrollHeight
    }
}

const updateContentHeights = () => {
    accordionItems.value.forEach((item, index) => {
        if (contentElements.value[index]) {
            item.contentHeight = contentElements.value[index].scrollHeight
        }
    })
}

// Инициализация высоты контента
onMounted(() => {
    setTimeout(updateContentHeights, 100)

    // Обновляем высоту при изменении содержимого
    const observer = new MutationObserver(updateContentHeights)
    contentElements.value.forEach((el) => {
        if (el) {
            observer.observe(el, { childList: true, subtree: true })
        }
    })
})

// Обновляем высоту при изменении данных
watch(
    accordionItems,
    () => {
        setTimeout(updateContentHeights, 100)
    },
    { deep: true }
)
</script>

<style scoped>
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
