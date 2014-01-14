<?php
/**
 * Template name: Homepage I
 *
 * @package WordPress
 * @subpackage Newsportal
 * @since Newsportal 1.0
 */
global $nesia_options;
get_header();
?>    
<div class='main-container container'>
  <div class='row'>
    <section class='main span8'>
      <div class='row'>
        <?php $headline = nesia_get_post_by_meta('headline', $nesia_options['nesia_headline_count']); ?>
        <?php if($headline->have_posts()): ?>
        <div class='headline-post-wrapper headline-post-slider span5'>
          <h4 class="block-title"><i class="icon-reorder"></i> <?php printf( __('Headlines on %s', 'nesia'), get_bloginfo('name')); ?></h4>
          <div class='headline-post'>
            <?php while($headline->have_posts()): $headline->the_post(); ?>
                <?php get_template_part('content', 'headline'); ?>
            <?php endwhile; ?>
          </div>
        </div>
        <!-- /End of Headlines post -->
        <?php endif; wp_reset_query(); ?>

        <?php $popularweek = nesia_popular_posts_duration(2, 7); ?>
        <?php if($popularweek->have_posts()): ?>
        <div class='popular-post popular-post-small span3'>
          <div class='innercontainer'>
            <h4 class="block-title"><i class="icon-bar-chart"></i> <?php _e('Popular This Week', 'nesia'); ?></h4>
            <?php while($popularweek->have_posts()): $popularweek->the_post(); ?>
            <article class='entry-post'>
              <div class='entry-category'>
                <?php the_category(', '); ?>
              </div>
              <header class='entry-header'>
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
              </header>
              <figure class='entry-top'>
                <a href='<?php the_permalink(); ?>'>
                  <?php nesia_image('width=300&height=202&force=true'); ?>
                </a>
              </figure>
              <time class='entry-date'><?php echo get_the_date(); ?></time>
              <div class='entry-content'>
                <?php nesia_the_excerpt(20, false); ?>
              </div>
            </article>
            <?php endwhile; ?>
          </div>
        </div>
        <!-- /End of Popular Post -->
        <?php endif; wp_reset_query(); ?>
        
        <?php get_template_part('content', 'quote'); ?>
        
      </div>
    </section>
    
    <?php get_sidebar('home'); ?>
  </div>
  <!-- / End row -->
  
  <?php get_template_part('content', 'featured-slide'); ?>
  
  <section class='section-container'>
    <div class='section-title'>
      <h4><?php _e('Browse Articles', 'nesia'); ?></h4>
    </div>
    <div class='post-grid row'>
      <?php query_posts('posts_per_page=12'); ?>
      <?php if(have_posts()): while(have_posts()): the_post(); ?>
      <article class='entry-post span3'>
          <figure class='entry-top'>
            <a href='<?php the_permalink(); ?>'>
              <?php nesia_image('width=270&noheight=true&force=true'); ?>
            </a>
            <span class="entry-comment-count"><i class="icon-comments"></i> <?php echo get_comments_number( get_the_ID() ); ?></span>
            <span class="entry-likes"><i class="icon-heart"></i> <?php echo nesia_get_count_voted( get_the_ID() ); ?></span>
          </figure>
          <div class='entry-category'>
            <?php the_category(', '); ?>
          </div>
          <header class='entry-header'>
            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
          </header>
          <time class='entry-date'><?php echo get_the_date(); ?></time>
          <div class='entry-content'>
            <?php nesia_the_excerpt(15, false); ?>
          </div>
      </article>
      <?php endwhile; endif; wp_reset_query(); ?>
    </div>
  </section>
  <!-- /End of pinterest layout -->    
</div>
<!-- /End of Main Container -->

<?php get_footer(); ?>