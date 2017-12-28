package com.albedo.java;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

public class FileUtilTest {
    public static void merge(String path, String targetFileName) throws Exception {
        File f = new File(path);
        if (!f.exists()) {
            System.out.println(path + " not exists");
            return;
        }
    File[] fileNames = f.listFiles();
        File fin = null;
// 构建文件输出流
        File fout = new File(targetFileName);
        FileOutputStream out = new FileOutputStream(fout);
        for (int i = 0; i < fileNames.length; i++) {
// 打开文件输入流
            fin = fileNames[i];
            FileInputStream in = new FileInputStream(fin);
// 从输入流中读取数据，并写入到文件数出流中
            int c=-1;
            byte[] data=new byte[in.available()];
            in.read(data);
            out.write(data);
// while ((c = in.read()) != -1) {
// out.write(c);
// }
            out.write("\r\n".getBytes());
            in.close();
        }
        out.close();
        System.out.println("合并文件" + targetFileName + "中的内容如下：");
    }

    public static void main(String[] args) throws Exception {

        merge("/home/somewhere/logOperate-audit-",
            "/home/somewhere/logOperate-sale/logOperate-audit.log");
    }


}
