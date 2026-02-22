<script>
    // No additional script is necessary for this spinner
  </script>
  
  <style>
    .spinner {
      animation: spin 1s linear infinite;
      border-top: 4px solid #f3c0d2; /* Soft pink color */
      border-right: 4px solid #eea5be; /* Hide the right side */
      border-bottom: 4px solid white; /* Hide the bottom side */
      border-left: 4px solid #eea5be; /* Hide the left side */
    }
  
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  </style>
  
  <div class="spinner h-10 w-10 border-4 rounded-full">
  </div>