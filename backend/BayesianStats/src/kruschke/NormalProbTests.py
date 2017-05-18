import scipy.stats
import numpy
import pylab
import scipy.stats, scipy
import matplotlib.pyplot as plt
import math


class NormalProb(object):
    
    def __init__(self):
        pass
    
    def model(self,position, width, height, dx):
        return  height * math.sqrt(2*math.pi) * width * scipy.stats.norm.pdf(dx, position, width)
    
    def test1(self):
        x = numpy.linspace(0, 1, 400)
        position = 0.5
        height = 1.0
        width = 0.1
        dx = numpy.linspace(0, 1, 400)
        gauss = self.model(position, width, height,dx)
        plt.plot(x,gauss, '+', color='red')
        plt.show()
    
    def test2(self):
        pass
        b1 = scipy.stats.norm(10, 9)
        b2 = scipy.stats.norm(25, 49)
        m = scipy.stats.norm(17.5, 25)
        print ("b1.15", b1.pdf(15))
        print ("b2.15", b2.pdf(15))
        print ("m.15", m.pdf(15))

    def start(self):
        self.test1()

npb = NormalProb()
npb.start()
