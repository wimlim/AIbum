import { getByText, render,screen } from "@testing-library/react"
import { HomePage } from "../component/HomePage"
import exp from "constants"
import { MemoryRouter, RouterProvider, createMemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { router } from "../AIbum_router"

describe(
    "Homepage测试",()=>{
        test("测试空照片内容",()=>{
            render(
                <RouterProvider router={createMemoryRouter(router,{
                    initialEntries:["/index"],
                })} />
            )

            //const emptyContent = screen.getByText("你的相册里还没有一张照片哦，快去上传吧!")
            const img = screen.getByAltText("empty placeholder")
            //expect(emptyContent).toBeInTheDocument();
            expect(img).toBeInTheDocument();
        })
    }
)