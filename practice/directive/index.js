import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>v-text:  <span v-text='text'></span></p>
      <p>v-text:  <span v-text='"Text:" + text'></span></p>
      <p>v-html:  <span v-html='html'></span></p>
      <p>v-show:  <span v-show='active'>{{show}}</span></p>
      <p>v-if: <span  v-if='active'>{{ifthing}}</span><span v-else-if='text === 9'>else-if content</span><span v-else>else content</span></p>
      <p>v-for:</p>
      <ul>
        <li v-for='item in arr'>{{item}}</li>
      </ul>
      <ul>
        <li v-for='(item, index) in arr' :key='item'>{{item}}:{{index}}</li>
      </ul>
      <ul>
        <li v-for='(val, key, index) in obj'>{{val}}:{{key}}:{{index}}</li>
      </ul>
      <p>v-model:</p>
      <p><input text='text' v-model='text'></p>
      <p><input type='checkbox' v-model='active'></p>
      <p>
        <input type='checkbox' :value='1' v-model='arr'>
        <input type='checkbox' :value='2' v-model='arr'>
        <input type='checkbox' :value='3' v-model='arr'>
      </p>
      <p>
        <input type='radio' value='one' v-model='picked'>
        <input type='radio' value='two' v-model='picked'>
      </p>
      <p>修饰符：.number<input text='text' v-model.number='text'>.trim<input text='text' v-model.trim='text'>.lazy<input text='text' v-model.lazy='text'></p>
      <p>v-pre:<span v-pre>{{text}}</span></p>
      <p>v-once:<span v-once>{{text}}</span></p>
    </div>
  `,
  data: {
    text: 9,
    html: '<span>this is html</span>',
    active: false,
    show: 'this is show',
    ifthing: 'this is if',
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: ''
  }
})
// v-text:指定了标签里面显示的内容，相当于innertext。就不能再在标签里写别的
// v-html:把变量的内容作为html插入。相当于innerhtml
// v-if:判断条件是false，节点就不存在了。动态增删节点，增加开销
// v-for:一般指定一个key，这样可以用缓存中的数据，节省开销。不要用index做key
// v-model:一般用在input上，自定义组件可以用
// 修饰符：.lazy修饰符，输入时候是没有变化的，只有在点开的时候change了才会变化
// v-pre:使用该指令，里面的都不会解析
// v-cloak:基本上使用webpack的开发都用不上，使用场景是在页面上引入了vue的库代码，在页面上写vue代码，模板是写在body的里面.在html加载的时候浏览器是不知道的，模板都会显示，该指令是在vue代码加载完之前，可以加一个样式display：none，整个代码隐藏掉，加载完之后再去掉，现在用不上
// v-once:数据绑定内容只执行一次，数据模板再次变化，也不会重新编译。适合在该节点下静态，不会再检测了，节省能开销
