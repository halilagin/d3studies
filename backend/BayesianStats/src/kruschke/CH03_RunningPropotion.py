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
class RunningPropotion(object):
    def __init__(self):
        pass
    
    def N0(self,x):
        return (1/np.sqrt(2*np.pi)) * np.exp(-.5 * (x)**2)

    
    def start(self):
        N = 5000
        # Generate a random sample of N flips for a fair coin (heads=1, tails=0);
        np.random.seed(47405)
        flip_sequence = np.random.choice(a=(0, 1), p=(.5, .5), size=N, replace=True)
        print (flip_sequence)
        # Compute the running proportion of heads:
        r = np.cumsum(flip_sequence)
        print (r)
        n = np.linspace(1, N, N)  # n is a vector.
        run_prop = r/n  # component by component division.
        
        # Graph the running proportion:
        plt.plot(n, run_prop, '-o', )
        plt.xscale('log')  # an alternative to plot() and xscale() is semilogx()
        plt.xlim(1, N)
        plt.ylim(0, 1)
        plt.xlabel('Flip Number')
        plt.ylabel('Proportion Heads')
        plt.title('Running Proportion of Heads')
        # Plot a dotted horizontal line at y=.5, just as a reference line:
        plt.axhline(y=.5, ls='dashed')
        
        # Display the beginning of the flip sequence.
        flipletters = ''
        for i in flip_sequence[:10]:
            if i == 1:
                flipletters += 'H'
            else:
                flipletters += 'T'
        
        plt.text(10, 0.8, 'Flip Sequence = %s...' % flipletters)
        # Display the relative frequency at the end of the sequence.
        plt.text(25, 0.2, 'End Proportion = %s' % run_prop[-1])
        plt.show()
        
def main():
    dp = RunningPropotion()
    dp.start()
    

if __name__ == "__main__": main()

