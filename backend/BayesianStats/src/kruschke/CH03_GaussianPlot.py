import matplotlib.pyplot as plt
import numpy as np;
import time 
from pylab import *
from drawnow import drawnow, figure
from filterpy.discrete_bayes import normalize
from filterpy.discrete_bayes import predict
from filterpy.discrete_bayes import update
from scipy.ndimage import measurements
import filterpy.stats as stats
from filterpy.stats import gaussian, multivariate_gaussian
from numpy.random import randn,seed
from filterpy.kalman import KalmanFilter
from filterpy.common import Q_discrete_white_noise


#https://github.com/aloctavodia/Doing_bayesian_data_analysis
class GauissianPlot(object):
    def __init__(self):
        pass
    
    def N0(self,x):
        return (1/np.sqrt(2*np.pi)) * np.exp(-.5 * (x)**2)

    
    def start(self):
        mu=0.0
        std=1
        dx=0.02
        
        x = np.arange(mu-4*std,mu+4*std, dx)
        y = 10+ (std) * self.N0(x)
        plt.plot(x, y)
        plt.show()
        
def main():
    dp = GauissianPlot()
    dp.start()
    

if __name__ == "__main__": main()

