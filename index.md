---
layout: page
title: Purpose of life
tagline: 
---
{% include JB/setup %}


    take a break comma then thinking comma
    Knowing what you’ve got comma
    Knowing what you need comma
    Knowing what you can do without dash
    and then fucking the world exclamation
   
# 忽略文件

````
vi .subversion/config
/miscellany #find 查找[miscellany]节点
commet out # global-ignores line
````

# SVN 帮助
````
svn　help # 全部功能选项
svn　help　ci # 具体功能的说明
````
# 检出
````
svn co http://路径(目录或文件的全路径)　[本地目录全路径] --username 用户名 --password 密码
svn co svn://路径(目录或文件的全路径)　[本地目录全路径] --username 用户名 --password 密码
svn checkout http://路径(目录或文件的全路径)　[本地目录全路径] --username　用户名
svn checkout svn://路径(目录或文件的全路径)　[本地目录全路径] --username　用户名
````
> 注：如果不带--password 参数传输密码的话，会提示输入密码，建议不要用明文的--password 选项。
其中 username 与 password前是两个短线，不是一个。
不指定本地目录全路径，则检出到当前目录下。

## **em**
````
svn co svn://localhost/测试工具 /home/testtools --username wzhnsc
svn co http://localhost/test/testapp --username wzhnsc
svn checkout svn://localhost/测试工具 /home/testtools --username wzhnsc
svn checkout http://localhost/test/testapp --username wzhnsc
````

# 查看文件或者目录状态
````
svn st
svn status 目录路径/文件名
````
- ?：不在svn的控制中； 
- M：内容被修改；
- C：发生冲突；
- A：预定加入到版本库；
- K：被锁定

````
svn -v 目录路径/名
svn status -v 目录路径/名＜－ 显示文件和子目录状态
````
>【第一列保持相同，第二列显示工作版本号，第三和第四列显示最后一次修改的版本号和修改人】 
> 注：svn status、svn diff 和 svn revert这三条命令在没有网络的情况下也可以执行的，
原因是svn在本地的.svn中保留了本地版本的原始拷贝。 


# 恢复本地修改
````
svn revert　[--recursive]　文件名/目录

svn revert foo.c # 丢弃对一个文件的修改
svn revert --recursive . # 恢复一整个目录的文件，. 为当前目录
````
> 注意: 本命令不会存取网络，并且会解除冲突的状况。但是它不会恢复被删除的目录。

# 更新文件
````
svn update
svn update　-r　修正版本　文件名
svn update　文件名/目录
````
**example**
````
svn update #后面没有目录，默认将当前目录以及子目录下的所有文件都更新到最新版本

svn update -r 200 test.cpp #将版本库中的文件 test.cpp 还原到修正版本（revision）200

svn update test.php #更新与版本库同步。

提交的时候提示过期冲突，需要先 update 修改文件，
然后清除svn resolved，最后再提交commit。
````

# 添加新文件 
````
svn add 文件名
````
> 注：告诉SVN服务器要添加文件了，还要用svn commint -m真实的上传上去！

**example**
````
svn add test.php # 添加test.php 
svn commit -m "添加我的测试用test.php" test.php
svn add *.php # 添加当前目录下所有的php文件
svn commit -m "添加我的测试用全部php文件" *.php
````

# 提交
````
svn commit -m “提交备注信息文本“ [-N]　[--no-unlock] 文件名
svn ci -m “提交备注信息文本“ [-N] [--no-unlock] 文件名
````

> 必须带上-m参数，参数可以为空，但是必须写上-m

**example**
````
svn commit -m “提交当前目录下的全部在版本控制下的文件“ * 
# 注意这个*表示全部文件

svn commit -m “提交我的测试用test.php“ test.php
svn commit -m “提交我的测试用test.php“ -N --no-unlock test.php 
# 保持锁就用–no-unlock开关


svn ci -m “提交当前目录下的全部在版本控制下的文件“ * 
# 注意这个*表示全部文件

svn ci -m “提交我的测试用test.php“ test.php
svn ci -m “提交我的测试用test.php“ -N --no-unlock test.php # 保持锁就用–no-unlock开关
````

# 删除文件
````
svn　delete　svn://路径(目录或文件的全路径) -m “删除备注信息文本”
svn　delete　文件名 
svn　ci　-m　“删除备注信息文本”
````
**ex**
````
svn delete svn://localhost/testapp/test.php -m “删除测试文件test.php”
svn delete test.php 
svn ci -m “删除测试文件test.php”
````
# 查看日志
````
svn　log　文件名
````
**ex**
````
svn log test.php # 显示这个文件的所有修改记录，及其版本号的变化
````

# 查看文件详细信息

````
svn　info　文件名
````
**ex**

````
svn info test.php
````

# 加锁/解锁 
````
svn　lock　-m　“加锁备注信息文本“　[--force]　文件名 
svn　unlock　文件名
````
**em**
````
svn lock -m “锁信测试用test.php文件“ test.php 
svn unlock test.php
````

# 比较差异 

````
svn　diff　文件名 
svn　diff　-r　修正版本号m:修正版本号n　文件名
````
**em**
````
svn diff test.php # 将修改的文件与基础版本比较
svn diff -r 200:201 test.php # 对 修正版本号200 和 修正版本号201 比较差异
````


# 解决冲突 
````
svn　resolved　[本地目录全路径]
````
**en**
````
svn update
````
````
C foo.c
Updated to revision 31.
// 如果你在更新时得到冲突，你的工作拷贝会产生三个新的文件：
$ ls
foo.c
foo.c.mine
foo.c.r30
foo.c.r31
// 当你解决了foo.c的冲突，并且准备提交，运行svn resolved让你的工作拷贝知道你已经完成了所有事情。
你可以仅仅删除冲突的文件并且提交，但是svn resolved除了删除冲突文件，还修正了一些记录在工作拷贝管理区域的记录数据，所以我们推荐你使用这个命令。
````

# 导出(导出一个干净的不带.svn文件夹的目录树)

````
svn export [-r 版本号] http://路径(目录或文件的全路径) [本地目录全路径]　--username　用户名
svn export [-r 版本号] svn://路径(目录或文件的全路径) [本地目录全路径]　--username　用户名
svn export 本地检出的(即带有.svn文件夹的)目录全路径 要导出的本地目录全路径
````

> 注：第一种从版本库导出干净工作目录树的形式是指定URL，
如果指定了修订版本号，会导出相应的版本，
如果没有指定修订版本，则会导出最新的，导出到指定位置。
如果省略 本地目录全路径，URL的最后一部分会作为本地目录的名字。
第二种形式是指定 本地检出的目录全路径 到 要导出的本地目录全路径，所有的本地修改将会保留，
但是不在版本控制下(即没提交的新文件，因为.svn文件夹里没有与之相关的信息记录)的文件不会拷贝。

## **em**

````
svn export svn://localhost/测试工具 /home/testtools --username wzhnsc
svn export svn://localhost/test/testapp --username wzhnsc
svn export /home/testapp /home/testtools
````

# 分支

## 新建一个分支copy
````
svn copy branchA branchB -m "make B branch" # branchA 拷贝出一个新分支 branchB
````
````
svn copy -m "业支分支酒吧v1.5.5开发" svn://ip/phpcode/platform svn://1ip/phpcode/platform_branches/jb_v155
````
> 然后 svn co branchB
> svn co svn://ip/phpcode/platform svn://1ip/phpcode/platform_branches/jb_v155 jb_v155

# 合并内容到分支merge
````
svn merge branchA branchB # 把对 branchA 的修改合并到分支 branchB
````

## Posts Lists

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
