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
from scipy.stats import beta

#https://github.com/aloctavodia/Doing_bayesian_data_analysis
class CH04_BetaPostrPred(object):
    def __init__(self):
        pass
    
    def N0(self,x):
        return (1/np.sqrt(2*np.pi)) * np.exp(-.5 * (x)**2)

    
    def start(self):
        
    
    # Specify known values of prior and actual data.
        prior_a = 100
        prior_b = 1
        actual_data_Z = 8
        actual_data_N = 12
        # Compute posterior parameter values.
        post_a = prior_a + actual_data_Z
        post_b = prior_b + actual_data_N - actual_data_Z
        # Number of flips in a simulated sample should match the actual sample size:
        sim_sample_size = actual_data_N
        # Designate an arbitrarily large number of simulated samples.
        n_sim_samples = 1000
        # Set aside a vector in which to store the simulation results.
        sim_sample_Z_record = np.zeros(n_sim_samples)
        # Now generate samples from the posterior.
        for sample_idx in range(0, n_sim_samples):
            # Generate a theta value for the new sample from the posterior.
            sample_theta = beta.rvs(post_a, post_b)
            # Generate a sample, using sample_theta.
            sample_data = np.random.choice([0, 1], p=[1-sample_theta, sample_theta],
                                          size=sim_sample_size, replace=True)
            sim_sample_Z_record[sample_idx] = sum(sample_data)
        
        
        ## Make a histogram of the number of heads in the samples.
        plt.hist(sim_sample_Z_record)
        plt.show()
    
def main():
    dp = CH04_BetaPostrPred()
    dp.start()
    

if __name__ == "__main__": main()

