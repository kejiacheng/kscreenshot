kscreenshot
===========

# 由于该插件还存在问题，不推荐在项目中使用该插件。

![](https://github.com/kejiacheng/img/blob/master/kscreenshot/screenshot1.gif)
![](https://github.com/kejiacheng/img/blob/master/kscreenshot/screenshot2.gif)
![](https://github.com/kejiacheng/img/blob/master/kscreenshot/screenshot3.gif)

npm:
```sh
npm install kscreenshot --save
```

### 功能
该截图工具带有下载，复制功能，并可用工具栏对截图进行简单绘制。

![](https://github.com/kejiacheng/img/blob/master/kscreenshot/toolbar.png)

工具栏功能从左到右依次为：颜色，文字，椭圆，矩形，线条，箭头，后退，完成。


### 使用
```js
import kscreenshot from 'kscreenshot'

//65指键盘中的A
new kscreenshot(
    {
        key: 65 
    }
)
```
当按下shift + A将会触发截图功能

#### 参数
<table>
  <tr>
    <th>参数</th>
    <th>说明</th>
    <th>类型</th>
    <th>默认值</th>
  </tr>
  <tr>
    <td>key</td>
    <td>截图触发按键（例：65时则同时按下shit + A则触发截图）</td>
    <td>number</td>
    <td>65</td>
  </tr>
  <tr>
    <td>toolShow</td>
    <td>工具栏各个工具显示(具体见下面toolshow配置)</td>
    <td>object</td>
    <td>默认每个工具都显示</td>
  </tr>  
  <tr>
    <td>copyPath</td>
    <td>参数为base64格式的图片（该功能不建议使用，最好是结合nw electron等工具实现复制功能。js目前暂未找到能兼容各客户端的方法，因此最好return null）</td>
    <td>Function</td>
    <td>noob</td>
  </tr>  
  <tr>
    <td>needDownload</td>
    <td>是否下载截图后的图片</td>
    <td>bool</td>
    <td>false</td>
  </tr> 
  <tr>
    <td>endCB</td>
    <td>成功结束截图后的回调函数</td>
    <td>Function</td>
    <td>noob</td>
  </tr> 
  <tr>
    <td>cancelCB</td>
    <td>撤销截图后的回调函数（关闭按钮，esc，鼠标右键）</td>
    <td>Function</td>
    <td>noob</td>
  </tr> 
  <tr>
    <td>immediately</td>
    <td>是否立即开启截图</td>
    <td>bool</td>
    <td>false</td>
  </tr> 
</table>

#### toolShow配置
<table>
  <tr>
    <th>参数</th>
    <th>说明</th>
    <th>类型</th>
    <th>默认值</th>
  </tr>
  <tr>
    <th>complete</th>
    <th>控制确认按键显示</th>
    <th>bool</th>
    <th>true</th>
  </tr>  
  <tr>
    <th>quit</th>
    <th>控制退出按键显示</th>
    <th>bool</th>
    <th>true</th>
  </tr>  
  <tr>
    <th>back</th>
    <th>控制后退按键显示</th>
    <th>bool</th>
    <th>true</th>
  </tr>  
  <tr>
    <th>arrow</th>
    <th>控制箭头按键显示</th>
    <th>bool</th>
    <th>true</th>
  </tr>  
  <tr>
    <th>drawLine</th>
    <th>控制线条按键显示（可以输入数字，初始化线条粗细，[1-10]）</th>
    <th>bool</th>
    <th>true</th>
  </tr>  
  <tr>
    <th>rect</th>
    <th>控制矩形按键显示</th>
    <th>bool</th>
    <th>true</th>
  </tr>  
  <tr>
    <th>ellipse</th>
    <th>控制椭圆按键显示</th>
    <th>bool</th>
    <th>true</th>
  </tr>  
  <tr>
    <th>text</th>
    <th>控制文字按键显示</th>
    <th>bool</th>
    <th>true</th>
  </tr>  
  <tr>
    <th>color</th>
    <th>控制颜色版按键显示</th>
    <th>bool</th>
    <th>true</th>
  </tr>  
</table>

#### 方法
<table>
  <tr>
    <td>
      startScreenShot()
    </td>
    <td>
      开启截图
    </td>
  </tr>
  <tr>
    <td>
      endScreenShot()
    </td>
    <td>
      结束截图
    </td>
  </tr>
</table>


### 结合NW，Electron等前端桌面开发库可实现整个显示屏截图

#### 实现demo图

![](https://github.com/kejiacheng/img/blob/master/kscreenshot/AllDisplay.gif)
