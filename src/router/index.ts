import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                meta: {
                    moduleName: '首页'
                },
                component: () => import('@/views/home.vue')
            },
            {
                path: '/project',
                name: 'project',
                meta: {
                    moduleName: '项目管理'
                },
                redirect: '/project/detail',
                component: () => import('@/views/project/project.vue'),
                children: [
                    {
                        path: '/project/detail',
                        name: 'project-detail',
                        // redirect: '/project/detail/home',
                        meta: {
                            moduleName: '详情'
                        },
                        component: () => import('@/views/project/detail.vue'),
                        // children: [
                        //     {
                        //         path: '/project/detail/home',
                        //         name: 'project-detail',
                        //         meta: {
                        //             moduleName: '详情的详情'
                        //         },
                        //         component: () => import('@/views/project/detail.vue'),
                        //     }
                        // ]
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/Register.vue')
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/',
        name: '404'
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router