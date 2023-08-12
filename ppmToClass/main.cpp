#include <iostream>

#include <vector>

#include <fstream>

#include <string>

using namespace std;

int resolutionx, resolutiony;

void readImage(vector<int>& pixels, const char* path){
    fstream readimage;
    readimage.open(path);
    int i1, i2, i3;
    char c[3];
    string trash;
    readimage >> trash;
    readimage >> resolutionx >> resolutiony;
    readimage >> i1;
    pixels.resize(resolutionx*resolutiony*4);
    if(trash == "P3"){
        for(int i = 0; readimage >> i1 >> i2 >> i3; i+=4){
            pixels[i] = i1;
            pixels[i+1] = i2;
            pixels[i+2] = i3;
            pixels[i+3] = 255;
        }  
    }else{
        for(int i = 0; i!=resolutionx*resolutiony*4; i+=4){
            readimage.get(c[0]);
            readimage.get(c[1]);
            readimage.get(c[2]);
            pixels[i] = (unsigned char) c[0];
            pixels[i+1] = (unsigned char) c[1];
            pixels[i+2] = (unsigned char) c[2];
            pixels[i+3] = 255;
        }
    }
    readimage.close();
}

int main(){
    vector<int> pixels;
    string name;
    cout << "enter file name:";
    cin >> name;
    readImage(pixels, name.c_str());
    cout << "enter class name:";
    cin >> name;
    ofstream myfile;
    myfile.open(name+"_texture.js");
    myfile << "const "<< name <<"x = " << resolutionx << ";" << endl;
    myfile << "const "<< name <<"y = " << resolutiony << ";" << endl;
    myfile << "const "<< name <<" = new Uint8Array([" << endl;
    for(int i = 0; i != resolutionx*resolutiony*4; i+=4){
        myfile << pixels[i] << "," << pixels[i+1] << "," << pixels[i+2] << "," << pixels[i+3] << "," << endl;
    }
	myfile << "]);" << endl;
	myfile.close();
    return 1;
}