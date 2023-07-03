import { render } from "@testing-library/react"
import { LoginBox } from "../component/LoginBox"

describe(
    "LoginBox测试",()=>{
        test("测试登录",()=>{
            render(<LoginBox/>)
            
        })
    }
)